import { spawn, spawnSync } from 'node:child_process'

const host = '127.0.0.1'
const port = '3000'
const baseURL = process.env.NEXT_PUBLIC_SITE_URL ?? `http://${host}:${port}`

const commandFor = (name) => (process.platform === 'win32' ? `node_modules\\.bin\\${name}.cmd` : `node_modules/.bin/${name}`)
const useShell = process.platform === 'win32'

const waitForServer = async (url, timeoutMs) => {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url)

      if (response.ok || response.status < 500) {
        return
      }
    } catch {
      // Server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  throw new Error(`Timed out waiting for ${url}`)
}

const killProcessTree = (pid) => {
  if (!pid) {
    return
  }

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(pid), '/T', '/F'], {
      stdio: 'ignore',
      timeout: 10_000,
    })
    return
  }

  try {
    process.kill(-pid, 'SIGTERM')
  } catch {
    try {
      process.kill(pid, 'SIGTERM')
    } catch {
      // Process has already exited.
    }
  }
}

const server = spawn(commandFor('next'), ['dev', '--hostname', host, '--port', port], {
  detached: process.platform !== 'win32',
  env: {
    ...process.env,
    NEXT_PUBLIC_SITE_URL: baseURL,
  },
  shell: useShell,
  stdio: 'ignore',
})

try {
  await waitForServer(baseURL, 120_000)

  const result = await new Promise((resolve, reject) => {
    const testProcess = spawn(commandFor('playwright'), ['test'], {
      env: {
        ...process.env,
        NEXT_PUBLIC_SITE_URL: baseURL,
      },
      shell: useShell,
      stdio: 'inherit',
    })

    testProcess.on('close', (code) => resolve(code ?? 1))
    testProcess.on('error', reject)
  })

  process.exitCode = result
} finally {
  killProcessTree(server.pid)
}

process.exit(process.exitCode ?? 0)
