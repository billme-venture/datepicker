# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2025-07-17

### Fixed
- Fixed "Cannot read properties of undefined (reading 'ReactCurrentDispatcher')" error
- Improved Rollup configuration to better externalize React dependencies
- Added React context validation with clearer error messages

### Added
- Comprehensive troubleshooting guide in README
- Solutions for multiple React versions issue
- Webpack, Vite, and Next.js configuration examples for resolving React conflicts

## [1.0.1] - 2025-07-17

### Fixed
- Internal improvements to dependency management

## [1.0.0] - 2025-07-14

### Added
- Initial release of @billme-venture/headless-datepicker
- Headless datepicker hook (`useDatePicker`) with full TypeScript support
- Three selection modes: single date, date range, and multiple dates
- Comprehensive date utilities and helper functions
- Built-in accessibility features
- Example components (SimpleCalendar, RangePicker, MultiSelectCalendar)
- Configurable constraints:
  - Min/max date limits
  - Disabled specific dates
  - Disabled days of the week
  - Custom first day of week
- Date formatting and parsing with date-fns
- Range selection with hover states
- Calendar navigation (previous/next month, go to today)
- Complete test suite with 28 passing tests
- Comprehensive documentation and examples

### Features
- **Headless Design**: Complete control over styling and UI
- **TypeScript Support**: Full type safety and IntelliSense
- **Lightweight**: Minimal dependencies (only date-fns)
- **Flexible**: Highly customizable configuration options
- **Accessible**: Built with accessibility in mind
- **SSR Compatible**: Works with Next.js and other SSR frameworks
