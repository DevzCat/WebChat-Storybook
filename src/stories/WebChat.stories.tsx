import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import WebChat, { IWebChat } from '../components/WebChat/WebChat'

export default {
  title: 'WebChat',
  component: WebChat,
} as Meta

const Template: Story<IWebChat> = args => <WebChat {...args} />

const defaultFont =
  '-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji'

export const Default = Template.bind({})
Default.args = {
  fontFamily: defaultFont,
}

export const Medium = Template.bind({})
Medium.args = {
  /* generics. */
  ratio: 'medium',

  /* containers. */

  /* labels. */
  label: 'Medium',
  fontFamily: defaultFont,

  /* colors. */
  background: 'linear-gradient(to right, #7b4397, #dc2430)',
}

export const Large = Template.bind({})
Large.args = {
  /* generics. */
  ratio: 'large',

  /* containers. */

  /* labels. */
  label: 'Large',
  fontFamily: defaultFont,

  /* colors. */
  backgroundImage:
    'https://images.unsplash.com/photo-1643048529646-0b457e105e37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
}

export const Speech = Template.bind({})
Speech.args = {
  /* generics. */
  speech: true,
  ratio: 'large',

  /* containers. */

  /* labels. */
  label: 'Speech',
  fontFamily: defaultFont,

  /* colors. */
  backgroundImage:
    'https://images.unsplash.com/photo-1643216831329-bd92084aa1d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
}

export const Dark = Template.bind({})
Dark.args = {
  /* generics. */
  dark: true,
  speech: true,
  ratio: 'large',

  /* containers. */

  /* labels. */
  label: 'Dark',
  fontFamily: defaultFont,

  /* colors. */
  backgroundImage:
    'https://images.unsplash.com/photo-1637499202056-cf221f3b0712?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
}

export const Standard = Template.bind({})
Standard.args = {
  /* generics. */
  speech: true,
  ratio: 'large',

  /* containers. */

  /* labels. */
  label: 'Standard',
  fontFamily: defaultFont,

  /* colors. */
  backgroundImage:
    'https://images.unsplash.com/photo-1638727752405-aa014ab0c85d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',

  /* ...props */
  bubbleFromUserBackground: 'linear-gradient(to right, #7b4397, #dc2430)',
  bubbleFromUserTextColor: '#ffffff',
  bubbleFromUserBorderRadius: 10,
  userAvatarImage: 'https://avatars.githubusercontent.com/u/96577741?v=4',
  userAvatarInitials: 'User',

  bubbleBackground: 'linear-gradient(to right, #7b4397, #dc2430)',
  bubbleTextColor: '#ffffff',
  bubbleBorderRadius: 10,
  botAvatarImage:
    'https://docs.microsoft.com/en-us/azure/bot-service/v4sdk/media/logo_bot.svg?view=azure-bot-service-4.0',
  botAvatarInitials: 'Bot',
}
