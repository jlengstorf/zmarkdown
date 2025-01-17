const textrApostrophes = require('typographic-apostrophes')
const textrApostrophesForPlurals = require('typographic-apostrophes-for-possessive-plurals')
const textrCopyright = require('typographic-copyright')
const textrEllipses = require('typographic-ellipses')
const textrEmDashes = require('typographic-em-dashes')
const textrEnDashes = require('typographic-en-dashes')
const textrRegisteredTrademark = require('typographic-registered-trademark')
const textrSingleSpaces = require('typographic-single-spaces')
const textrTrademark = require('typographic-trademark')

const textrColon = require('typographic-colon/src')
const textrEmDash = require('typographic-em-dash/src')
const textrExclamationMark = require('typographic-exclamation-mark/src')
const textrGuillemets = require('typographic-guillemets/src')
const textrPercent = require('typographic-percent/src')
const textrPermille = require('typographic-permille/src')
const textrQuestionMark = require('typographic-question-mark/src')
const textrSemicolon = require('typographic-semicolon/src')

const gh = require('hast-util-sanitize/lib/github')
const katex = require('./sanitize-katex')
const merge = require('deepmerge')

const sanitizeConfig = merge.all([gh, katex, {
  tagNames: ['span', 'abbr', 'figure', 'figcaption', 'iframe'],
  attributes: {
    a: ['ariaHidden', 'class', 'className'],
    div: ['id', 'class', 'className'],
    span: ['id'],
    h1: ['ariaHidden'],
    h2: ['ariaHidden'],
    h3: ['ariaHidden'],
    abbr: ['title'],
    img: ['class'],
    code: ['className'],
    th: ['colspan', 'colSpan', 'rowSpan', 'rowspan'],
    td: ['colspan', 'colSpan', 'rowSpan', 'rowspan'],
    iframe: ['allowfullscreen', 'frameborder', 'height', 'src', 'width'],
  },
  protocols: {
    href: ['ftp', 'dav', 'sftp', 'magnet', 'tftp', 'view-source'],
    src: ['ftp', 'dav', 'sftp', 'tftp'],
  },
  clobberPrefix: '',
  clobber: [],
}])

const remarkConfig = {
  maxNesting: 100,
  reParse: {
    gfm: true,
    commonmark: false,
    footnotes: true,
    pedantic: false,
    /* sets list of known blocks to nothing, otherwise <h3>hey</h3> would become
    &#x3C;h3>hey&#x3C;/h3> instead of <p>&#x3C;h3>hey&#x3C;/h3></p> */
    blocks: [],
  },

  enableTextr: true,
  textr: {
    plugins: [
      textrApostrophes,
      textrApostrophesForPlurals,
      textrEllipses,
      textrEmDashes,
      textrEnDashes,
      textrCopyright,
      textrRegisteredTrademark,
      textrSingleSpaces,
      textrTrademark,

      textrColon,
      textrEmDash,
      textrExclamationMark,
      textrGuillemets,
      textrPercent,
      textrPermille,
      textrQuestionMark,
      textrSemicolon,
    ],
    options: {
      locale: 'fr',
    },
  },

  autolinkHeadings: {
    behaviour: 'append',
  },

  headingShifter: 0,

  remark2rehype: {
    allowDangerousHTML: true,
  },

  rehypeHighlight: {
    ignoreMissing: true,
    plainText: ['console'],
    aliases: {tex: ['latex']},
  },

  footnotesTitles: 'Retourner au texte de la note $id',

  alignBlocks: {
    center: 'align-center',
    right: 'align-right',
  },

  customBlocks: {
    secret: {
      classes: 'custom-block-spoiler',
      title: 'optional',
    },
    s: {
      classes: 'custom-block-spoiler',
      title: 'optional',
    },
    information: {
      classes: 'custom-block-information',
      title: 'optional',
    },
    i: {
      classes: 'custom-block-information',
      title: 'optional',
    },
    question: {
      classes: 'custom-block-question',
      title: 'optional',
    },
    q: {
      classes: 'custom-block-question',
      title: 'optional',
    },
    attention: {
      classes: 'custom-block-warning',
      title: 'optional',
    },
    a: {
      classes: 'custom-block-warning',
      title: 'optional',
    },
    erreur: {
      classes: 'custom-block-error',
      title: 'optional',
    },
    e: {
      classes: 'custom-block-error',
      title: 'optional',
    },
    neutre: {
      classes: 'custom-block-neutral',
      title: 'required',
    },
    n: {
      classes: 'custom-block-neutral',
      title: 'required',
    },
  },

  escapeEscaped: ['&'],

  emoticons: {
    emoticons: {
      ':ange:': '/static/smileys/ange.png',
      ':colere:': '/static/smileys/angry.gif',
      'o_O': '/static/smileys/blink.gif',
      ';)': '/static/smileys/clin.png',
      ':B': '/static/smileys/b.png',
      ':diable:': '/static/smileys/diable.png',
      ':D': '/static/smileys/heureux.png',
      '^^': '/static/smileys/hihi.png',
      ':o': '/static/smileys/huh.png',
      ':p': '/static/smileys/langue.png',
      ':magicien:': '/static/smileys/magicien.png',
      ':colere2:': '/static/smileys/mechant.png',
      ':ninja:': '/static/smileys/ninja.png',
      'x(': '/static/smileys/pinch.png',
      '>_<': '/static/smileys/pinch.png',
      'X/': '/static/smileys/pinch.png',
      ':pirate:': '/static/smileys/pirate.png',
      ":'(": '/static/smileys/pleure.png',
      ':lol:': '/static/smileys/rire.gif',
      ':honte:': '/static/smileys/rouge.png',
      ':-°': '/static/smileys/siffle.png',
      ':)': '/static/smileys/smile.png',
      ':soleil:': '/static/smileys/soleil.png',
      ':(': '/static/smileys/triste.png',
      ':euh:': '/static/smileys/unsure.gif',
      ':waw:': '/static/smileys/waw.png',
      ':zorro:': '/static/smileys/zorro.png',
      '^(;,;)^': '/static/smileys/cthulhu.png',
      ':popcorn:': '/static/smileys/popcorn.png',
    },
    classes: 'smiley',
  },

  math: {
    inlineMathDouble: true,
  },

  katex: {
    inlineMathDoubleDisplay: true,
  },

  iframes: {
    'www.dailymotion.com': {
      width: 480,
      height: 270,
      disabled: false,
      oembed: 'https://www.dailymotion.com/services/oembed',
    },
    'www.vimeo.com': {
      width: 500,
      height: 281,
      disabled: false,
      oembed: 'https://vimeo.com/api/oembed.json',
    },
    'vimeo.com': {
      width: 500,
      height: 281,
      disabled: false,
      oembed: 'https://vimeo.com/api/oembed.json',
    },
    'www.youtube.com': {
      width: 560,
      height: 315,
      disabled: false,
      oembed: 'https://www.youtube.com/oembed',
    },
    'youtube.com': {
      width: 560,
      height: 315,
      disabled: false,
      oembed: 'https://www.youtube.com/oembed',
    },
    'youtu.be': {
      width: 560,
      height: 315,
      disabled: false,
      oembed: 'https://www.youtube.com/oembed',
    },
    'soundcloud.com': {
      width: 500,
      height: 305,
      disabled: false,
      oembed: 'https://soundcloud.com/oembed',
    },
    'www.ina.fr': {
      tag: 'iframe',
      width: 620,
      height: 349,
      disabled: false,
      replace: [
        ['www.', 'player.'],
        ['/video/', '/player/embed/'],
      ],
      append: '/1/1b0bd203fbcd702f9bc9b10ac3d0fc21/560/315/1/148db8',
      removeFileName: true,
    },
    'www.jsfiddle.net': {
      tag: 'iframe',
      width: 560,
      height: 560,
      disabled: false,
      replace: [
        ['http://', 'https://'],
      ],
      append: 'embedded/result,js,html,css/',
      match: /https?:\/\/(www\.)?jsfiddle\.net\/([\w\d]+\/[\w\d]+\/\d+\/?|[\w\d]+\/\d+\/?|[\w\d]+\/?)$/,
      thumbnail: {
        format: 'http://www.unixstickers.com/image/data/stickers' +
        '/jsfiddle/JSfiddle-blue-w-type.sh.png',
      },
    },
    'jsfiddle.net': {
      tag: 'iframe',
      width: 560,
      height: 560,
      disabled: false,
      replace: [
        ['http://', 'https://'],
      ],
      append: 'embedded/result,js,html,css/',
      match: /https?:\/\/(www\.)?jsfiddle\.net\/([\w\d]+\/[\w\d]+\/\d+\/?|[\w\d]+\/\d+\/?|[\w\d]+\/?)$/,
      thumbnail: {
        format: 'http://www.unixstickers.com/image/data/stickers' +
        '/jsfiddle/JSfiddle-blue-w-type.sh.png',
      },
    },
  },

  captions: {
    external: {
      table: 'Table:',
      gridTable: 'Table:',
      code: 'Code:',
      math: 'Equation:',
      iframe: 'Video:',
    },
    internal: {
      math: 'Equation:',
      inlineMath: 'Equation:',
      image: 'Figure:',
    },
  },

  ping: {
    pingUsername: (_username) => true,
    userURL: (username) => `/membres/voir/${username}/`,
    usernameRegex: /\B@(?:\*\*([^*]+)\*\*|(\w+))/,
  },

  disableTokenizers: {},

  imagesDownload: {
    disabled: true,
    downloadDestination: './img/',
    maxlength: 1000000,
    dirSizeLimit: 10000000,
  },
  sanitize: sanitizeConfig,
}

module.exports = remarkConfig
