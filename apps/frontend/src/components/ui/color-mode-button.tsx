'use client'

import { css, cx } from "styled-system/css";
import { use, useEffect } from "react";

import { button } from "styled-system/recipes";

export function ColorModeButton() {
  useEffect(() => {

  const setColorMode = () => {
    const colorMode = (() => {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('park-ui-color-mode')) {
        return JSON.parse(window?.localStorage?.getItem('park-ui-color-mode')!)
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
      return 'light'
    })()

    if (colorMode === 'light') {
        document.documentElement.classList.remove('dark')
      } else {
        document.documentElement.classList.add('dark')
      }
      window.localStorage.setItem('park-ui-color-mode', JSON.stringify(colorMode))
    }
    setColorMode()
  }, []);
  const handleToggleClick = () => {
      const element = document.documentElement
      element.classList.toggle('dark')
      const colorMode = element.classList.contains('dark') ? 'dark' : 'light'
      window.localStorage.setItem('park-ui-color-mode', JSON.stringify(colorMode))
  }
  return (
    <button
      onClick={handleToggleClick}
      id="themeToggle"
      className={cx(css({ px: "0" }), button({ variant: "ghost", size: "md" }))}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle className="sun" cx="12" cy="12" r="4"></circle>
        <path className="sun" d="M12 2v2"></path>
        <path className="sun" d="M12 20v2"></path>
        <path className="sun" d="m4.93 4.93 1.41 1.41"></path>
        <path className="sun" d="m17.66 17.66 1.41 1.41"></path>
        <path className="sun" d="M2 12h2"></path>
        <path className="sun" d="M20 12h2"></path>
        <path className="sun" d="m6.34 17.66-1.41 1.41"></path>
        <path className="sun" d="m19.07 4.93-1.41 1.41"></path>

        <path className="moon" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>
    </button>
  );
}
