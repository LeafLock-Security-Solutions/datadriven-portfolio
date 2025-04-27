#!/bin/sh

# -----------------------------------------------------------------------------------
# Script: utils.sh
# Purpose: Shared functions and reusable constants for Git hook scripts.
# Source this script in each hook file to use standardized logging and color handling.
#
# Example usage:
#   . "$(dirname "$0")/utils.sh"
# -----------------------------------------------------------------------------------

# Determine if terminal supports colors
supports_color() {
  # Disable if NO_COLOR is set
  [ -n "$NO_COLOR" ] && return 1

  # Disable on Git Bash or other Windows-like shells with poor ANSI support
  case "$(uname -s)" in
    MINGW*|CYGWIN*|MSYS*)
      return 1
      ;;
  esac

  # Enable if output is to terminal
  [ -t 1 ] && return 0
  return 1
}

# Set color variables only if supported
if supports_color; then
  RED="\033[0;31m"
  GREEN="\033[0;32m"
  YELLOW="\033[1;33m"
  RESET="\033[0m"
else
  RED=""
  GREEN=""
  YELLOW=""
  RESET=""
fi

# Common logging helpers
log_info() {
  echo "${YELLOW}💡  $1${RESET}"
}

log_success() {
  echo "${GREEN}✅  $1${RESET}"
}

log_error() {
  echo "${RED}❌  $1${RESET}"
}
