#!/usr/bin/env node
'use strict';

// attach environmental vars from ".env" file to process.env
require('dotenv').config();

// handles live node reloads
if (process.env.NODE_ENV !== 'production' && !require('piping')({hook: true, ignore: /(\/\.|~$|\.json$)/i}))
  return;

require('../server.babel'); // babel registration (runtime transpilation for node)

// connect db before running API
require('../db')
  .then(() => require('../api'))
  .catch(err => console.log(err));
