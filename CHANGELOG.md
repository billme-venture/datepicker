# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2025-07-17

### Fixed
- **Improved DateTime UX**: Datepicker now stays open when time is enabled after date selection
  - In single mode: Datepicker remains open after selecting a date when `time.enableTime = true`
  - In range mode: Datepicker remains open after completing a range when time is enabled
  - Only closes when using `selectDateAndTime()` (both date and time selected)
  - Normal behavior (auto-close) when time is disabled

### Enhanced
- Better user experience for datetime selection workflows
- More logical interaction flow when both date and time selection are required

## [1.1.0] - 2025-07-17

### Added
- **Smart Calendar Initialization**: Calendar now automatically opens to the month of pre-selected dates
  - When `selectedDate` is provided, calendar opens to that date's month
  - When `selectedRange` is provided, calendar opens to the start date's month  
  - When `selectedDates` is provided, calendar opens to the first date's month
  - Falls back to current month when no initial dates are provided
- New example component demonstrating pre-selected date behavior
- Comprehensive test coverage for calendar initialization logic
- Documentation section explaining calendar initialization behavior

### Enhanced
- Better user experience when initializing datepicker with pre-selected dates
- More intuitive navigation starting point based on user data

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
