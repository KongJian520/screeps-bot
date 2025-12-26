/**
 * ESLint v9+ 扁平配置文件 (Flat Config)
 * 包含全自动 Import 排序功能
 */
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // 继承 ESLint 和 TS 的推荐配置
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    // 指定检查的文件范围
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      // 注册插件
      'import': importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // --- 核心修复：全自动排序 ---
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'sort-imports': 'off', // 关闭原生规则

      // --- 保持你原本的规则偏好 ---
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      'camelcase': 'error',
      'eqeqeq': ['error', 'smart'],
      'no-console': 'off',
      'no-var': 'error',
      'object-shorthand': 'error',

      // 解决之前报错中的 non-null assertion 等
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
  },
  // 必须放在最后以禁用所有冲突的样式规则
  eslintConfigPrettier
);
