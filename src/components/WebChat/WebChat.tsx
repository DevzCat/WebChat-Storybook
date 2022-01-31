import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import ReactWebChat, {
  createCognitiveServicesSpeechServicesPonyfillFactory,
  createDirectLine,
} from 'botframework-webchat'
import { ratioOptions, radiusOptions } from '../../utils/options.util'
import '../../styles/loading.style.css'
import '../../styles/webchat.style.css'

// State interfaces.
interface ITokens {
  directLine: { token: string }
  speech: {
    authorizationToken: string
    region: string
  }
}

// Other interfaces (styles).
interface IContainerStyles {
  border: string
  borderRadius: string
}

interface IBodyStyles {
  height: string
  width: string
}

// WebChat type interface.
export interface IWebChat {
  /* main */
  dark: boolean // using with dark mode?
  speech: boolean // using with speech mode?
  ratio: string // scale the webchat's size.

  /* container */
  border: number
  borderColor: string
  borderRadius: string

  /* labels */

  /* fonts */
  label: string
  fontFamily: string
  fontSize: number
  fontWeight: number

  /* colors */
  background: string
  backgroundColor: string
  backgroundImage: string
  color: string

  [props: string]: any
}

// global instance.
let styleOptions: any = {}

export default function WebChat({
  /* main */
  dark,
  speech,
  ratio,

  /* containers */
  border,
  borderColor,
  borderRadius,

  /* labels */

  /* fonts */
  label,
  fontFamily,
  fontSize,
  fontWeight,

  /* colors */
  background,
  backgroundColor,
  backgroundImage,
  color,

  ...props
}: React.PropsWithChildren<IWebChat>) {
  // states field.
  const [tokens, setTokens] = useState<ITokens>({
    directLine: { token: '' },
    speech: { authorizationToken: '', region: '' },
  })

  // defines own styles.
  const containerStyles: IContainerStyles = {
    border: `${border}px solid ${borderColor}`,
    borderRadius: radiusOptions[borderRadius],
  }

  const labelStyles: any = {
    /* fonts */
    fontFamily,
    fontSize: fontSize ? `${fontSize}rem` : ratioOptions[ratio]['fontSize'],
    fontWeight,

    /* colors */
    color,

    /* configs */
    padding: ratioOptions[ratio]['padding'],
  }

  const bodyStyles: IBodyStyles = {
    height: ratioOptions[ratio]['height'],
    width: ratioOptions[ratio]['width'],
  }

  // webchat styles configuration options.
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      styleOptions[key] = value
    }
  }

  // if in dark mode.
  if (dark) {
    styleOptions['backgroundColor'] = '#0d1117'
    styleOptions['bubbleBorderColor'] = '#ffffff'
    styleOptions['bubbleBackground'] = '#ffffff'
    styleOptions['bubbleTextColor'] = '#000000'
    styleOptions['bubbleFromUserBorderColor'] = '#ffffff'
    styleOptions['bubbleFromUserBackground'] = '#ffffff'
    styleOptions['bubbleFromUserTextColor'] = '#000000'
  }

  // useMemo hooks.
  const directLine = useMemo(
    () => createDirectLine(tokens['directLine']),
    [tokens],
  )
  const webSpeechPonyfillFactory = useMemo(
    () =>
      createCognitiveServicesSpeechServicesPonyfillFactory({
        credentials: tokens['speech'],
      }),
    [tokens],
  )

  // engines (prioritize the background-image first, then background gradient and then background color).
  if (backgroundImage) {
    labelStyles['backgroundImage'] = `url(${backgroundImage})`
  } else if (background) {
    labelStyles['background'] = background
  } else {
    labelStyles['backgroundColor'] = backgroundColor
  }

  useEffect(() => {
    // reset styleOptions.
    styleOptions = {}

    // main function for fetching tokens.
    const onFetch = async () => {
      // for direct line.
      const directLineToken = async () => {
        const res = await fetch(
          'https://webchat-mockbot.azurewebsites.net/directline/token',
          { method: 'POST' },
        )
        const { token } = await res.json()

        return { token }
      }

      // for speech token.
      const speechToken = async () => {
        const res = await fetch(
          'https://webchat-mockbot.azurewebsites.net/speechservices/token',
          { method: 'POST' },
        )
        const { authorizationToken, region } = await res.json()

        return { authorizationToken, region }
      }

      // if user want to use with speech.
      if (speech) {
        setTokens({
          directLine: await directLineToken(),
          speech: await speechToken(),
        })

        return
      }

      // for standard webchat.
      setTokens({
        directLine: await directLineToken(),
        speech: {
          authorizationToken: '',
          region: '',
        },
      })

      return
    }

    // invoke after all state has been init.
    onFetch()
  }, [])

  return (
    <div className="webchat-container" style={containerStyles}>
      <div className="webchat-label" style={labelStyles}>
        {label}
      </div>
      <div className="webchat-body" style={bodyStyles}>
        {speech ? (
          <>
            {tokens['directLine']['token'] &&
            tokens['speech']['authorizationToken'] ? (
              <ReactWebChat
                directLine={directLine}
                webSpeechPonyfillFactory={webSpeechPonyfillFactory}
                styleOptions={styleOptions}
              />
            ) : (
              <div className="loading">loading webchat....</div>
            )}
          </>
        ) : (
          <>
            {tokens['directLine']['token'] ? (
              <ReactWebChat
                directLine={directLine}
                styleOptions={styleOptions}
              />
            ) : (
              <div className="loading">loading webchat...</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// specify props type.
WebChat.propTypes = {
  // configs.
  ratio: PropTypes.oneOf(['small', 'medium', 'large']),

  /* containers. */
  borderColor: PropTypes.string,
  borderRadius: PropTypes.oneOf(['small', 'medium', 'large']),

  /* labels. */

  /* fonts. */
  label: PropTypes.string.isRequired,
  fontFamily: PropTypes.string,
  fontWeight: PropTypes.number,

  /* colors. */
  background: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  color: PropTypes.string,
}

// default props value.
WebChat.defaultProps = {
  // configs.
  dark: false,
  speech: false,
  ratio: 'small',

  /* containers. */
  border: 4,
  borderColor: '#000000',
  borderRadius: 'small',

  /* labels. */

  /* fonts. */
  label: 'Contact',
  fontFamily: 'sans-serif',
  fontSize: 1,
  fontWeight: 'normal',

  /* colors. */
  background: '',
  backgroundImage: '',
  backgroundColor: '#5f249f',
  color: '#ffffff',
}
