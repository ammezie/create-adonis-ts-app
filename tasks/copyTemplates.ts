/*
 * adonis-ts-boilerplate
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { join } from 'path'
import readDir from 'fs-readdir-recursive'
import { TemplateFile, logger } from '@adonisjs/sink'

import { TaskFn } from '../src/contracts'

/**
 * Copies templates to project directory
 */
const task: TaskFn = (absPath, _app, state) => {
  const files = readDir(join(__dirname, '..', 'templates', state.boilerplate))

  files
    .forEach((name: string) => {
      const outputFileName = name.replace(/\.txt$/, '.ts')
      const src = join(__dirname, '..', 'templates', state.boilerplate, name)
      new TemplateFile(absPath, outputFileName, src).apply({}).commit()
      logger.create(outputFileName)
    })
}

export default task
