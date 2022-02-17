const { execSync } = require('child_process')

console.log('\x1b[36m%s\x1b[0m', 'Clear "dist" folder')
execSync('rimraf dist', { stdio: 'inherit' })

for (const type of ['es', 'lib']) {
  console.log('\x1b[36m%s\x1b[0m', `Start building "${type}"`)
  execSync(`babel --config-file ./babelrc-${type}.json --extensions .ts,.tsx src/lib --out-dir dist/${type}`, {
    stdio: 'inherit'
  })
  execSync(
    `tsc src/lib/index.tsx --declaration --emitDeclarationOnly --jsx react --esModuleInterop --outDir dist/${type} --skipLibCheck`,
    { stdio: 'inherit' }
  )
  execSync(`copyfiles -u 2 "src/lib/**/*.less" dist/${type}`, { stdio: 'inherit' })
  console.log('\x1b[36m%s\x1b[0m', `Finished building "${type}"`)
}
