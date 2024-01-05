import { Box, Container, HStack } from "styled-system/jsx";
import { SiGithub, SiTwitter } from "@icons-pack/react-simple-icons";
import { css, cx } from "styled-system/css";

import { ColorModeButton } from "../ui/color-mode-button";
import { Heading } from "../ui/heading";
import { Logo } from "../ui/logo";
import { button } from "styled-system/recipes";

export function Navbar(props: any) {
  return (
    <Box divideY="1px" {...props} bg={'black.800'}>
      <Container>
        <HStack justify="space-between" py="3" gap="8">
          <a href="/" aria-label="Go to start page">
            <Logo />
          </a>
          <Heading textStyle={'2xl'}>
            Books GPT4 App
          </Heading>
          <HStack gap={{ base: '2', md: '4' }}>
            <slot name="action" />
            <HStack gap="0.5">
              <a
                href="https://twitter.com/ndresdavid"
                target="_blank"
                className={cx(
                  button({ variant: 'ghost' }),
                  css({ px: '0', display: { base: 'none', sm: 'inline-flex' } }),
                )}
              >
                <SiTwitter />
              </a>
              <a
                href="https://github.com/kattsushi/books"
                target="_blank"
                className={cx(
                  button({ variant: 'ghost' }),
                  css({ px: '0', display: { base: 'none', sm: 'inline-flex' } }),
                )}
              >
                <SiGithub />
              </a>
              <ColorModeButton />
            </HStack>
          </HStack>
        </HStack>
      </Container>
      <slot />
    </Box>
  )
}