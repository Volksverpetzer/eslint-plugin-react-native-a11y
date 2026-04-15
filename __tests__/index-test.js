/* eslint global-require: 0 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import plugin from '../src';

const rules = fs
  .readdirSync(path.resolve(__dirname, '../src/rules/'))
  .map((f) => path.basename(f, '.js'));

describe('all rule files should be exported by the plugin', () => {
  rules.forEach((ruleName) => {
    it(`should export ${ruleName}`, () => {
      assert.equal(
        plugin.rules[ruleName],
        require(path.join('../src/rules', ruleName))
      );
    });
  });
});

describe('configurations', () => {
  const legacyConfigs = ['basic', 'ios', 'android', 'all'];
  const flatConfigs = ['flat/basic', 'flat/ios', 'flat/android', 'flat/all'];

  legacyConfigs.forEach((name) => {
    it(`should export a '${name}' legacy configuration`, () => {
      assert(plugin.configs[name]);
    });
  });

  flatConfigs.forEach((name) => {
    it(`should export a '${name}' flat configuration`, () => {
      assert(plugin.configs[name]);
      assert(Array.isArray(plugin.configs[name]));
    });
  });
});

describe('meta', () => {
  it('should export plugin meta with name and version', () => {
    assert(plugin.meta);
    assert.equal(typeof plugin.meta.name, 'string');
    assert.equal(typeof plugin.meta.version, 'string');
  });
});

describe('schemas', () => {
  rules.forEach((ruleName) => {
    it(`${ruleName} should export a schema with type object`, () => {
      const rule = require(path.join('../src/rules', ruleName));
      const schema = rule.meta && rule.meta.schema && rule.meta.schema[0];
      const { type } = schema;

      assert.deepEqual(type, 'object');
    });
  });
});
