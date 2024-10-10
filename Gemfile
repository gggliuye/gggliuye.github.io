# frozen_string_literal: true

source "https://rubygems.org"

# https://stackoverflow.com/questions/73903473/jekyll-4-0-0-error-uninitialized-constant-tzinfotimezone
# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo"
  gem "tzinfo-data"
end

gemspec
