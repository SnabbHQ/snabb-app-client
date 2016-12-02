'use strict';

import Translations from "./Translations.json";

const SnabbI18n = require('react-native-i18n');
SnabbI18n.fallbacks = true
SnabbI18n.translations = Translations;

export default SnabbI18n
