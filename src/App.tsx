'use client'

import * as React from 'react'
import { Admin, Resource } from 'react-admin'
import polyglotI18nProvider from 'ra-i18n-polyglot'

import authProvider from './Auth/Auth'
import { Login, Layout } from './layout'
import { Dashboard } from './dashboard'
import englishMessages from './i18n/en'
import { lightTheme, darkTheme } from './layout/themes'
import users from './Users'
import instruments from './Instruments'
import genres from './Genres'
import effects from './Effects'
import dataProviderFactory from './dataProvider'
import presets from './Presets'
import bpms from './Bpms'
import projectCategories from './ProjectCategories'
import contests from './Contests'
import referralcodes from './ReferralCodes'
import samples from './Samples'
import tracks from './Tracks'
import projects from './Projects'
import comments from './Comments'
import newsitems from './NewsItems'
import samplesets from './SampleSets'
import timelineitems from './TimelineItems'
import notification from './PushNotification'
import playlists from './Playlists'
import homescreens from './Homesreens'

const i18nProvider = polyglotI18nProvider(
   (locale) => {
      if (locale === 'nl') {
         return import('./i18n/nl').then((messages) => messages.default)
      }

      // Always fallback on english
      return englishMessages
   },
   'en',
   { allowMissing: true },
   [
      { locale: 'en', name: 'English' },
      // { locale: "nl", name: "Dutch" },
   ]
)

const App = () => (
   <Admin
      title=""
      dataProvider={dataProviderFactory(
         process.env.REACT_APP_DATA_PROVIDER || ''
      )}
      authProvider={authProvider}
      dashboard={Dashboard}
      loginPage={Login}
      layout={Layout}
      i18nProvider={i18nProvider}
      disableTelemetry
      theme={lightTheme}
      darkTheme={darkTheme}
      defaultTheme="dark"
   >
      <Resource name="users" {...users} />
      <Resource name="musicalInstruments" {...instruments} />
      <Resource name="genres" {...genres} />
      <Resource name="effects" {...effects} />
      <Resource name="presets" {...presets} />
      <Resource name="presets" {...presets} />
      <Resource name="bpmTemp" {...bpms} />
      <Resource name="projectcategories" {...projectCategories} />
      <Resource name="contests" {...contests} />
      <Resource name="referralcode" {...referralcodes} />
      <Resource name="samples" {...samples} />
      <Resource name="tracks" {...tracks} />
      <Resource name="projects" {...projects} />
      <Resource name="comments" {...comments} />
      <Resource name="newsitems" {...newsitems} />
      <Resource name="samplesets" {...samplesets} />
      <Resource name="timelineitems" {...timelineitems} />
      <Resource name="notification" {...notification} />
      <Resource name="playlists" {...playlists} />
      <Resource name="homescreens" {...homescreens} />
   </Admin>
)

export default App
