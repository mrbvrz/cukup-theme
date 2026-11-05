/**
 * =============================================================================
 * Cukup Theme Generator — Telegram Desktop (.tdesktop-theme) & macOS (.palette)
 * =============================================================================
 * Generates both native macOS (.palette) and cross-platform Telegram Desktop
 * (.tdesktop-theme zipped package with tiled neutral background).
 * =============================================================================
 */

const zlib = require('zlib');

/**
 * Creates a minimal valid uncompressed/deflated PNG image buffer of 16x16 solid RGB color.
 */
function createSolidPng(hex) {
  const cleanHex = hex.replace('#', '').slice(0, 6);
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  const width = 16;
  const height = 16;
  const rawData = Buffer.alloc(height * (1 + width * 3));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
    }
  }
  const compressed = zlib.deflateSync(rawData);

  function crc32(buf) {
    let table = new Int32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      table[i] = c;
    }
    let crc = -1;
    for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    return (crc ^ -1) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const toCrc = Buffer.concat([typeBuf, data]);
    crcBuf.writeUInt32BE(crc32(toCrc), 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 2; // RGB
  ihdr[10] = 0; // Deflate
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

/**
 * Generates Telegram Desktop colors.tdesktop-theme content
 */
function generateTdesktopColors(palette, key) {
  const isLight = palette.variant === 'light';
  const s = palette.surface;
  const b = palette.border;
  const t = palette.text;
  const a = palette.ansi;
  const syn = palette.syntax;
  const stat = palette.status;

  // Key tokens mapped to Cukup semantics
  const mainBg = s.canvas;
  const panelBg = s.panel || s.canvas;
  const elevatedBg = s.elevated || s.surface;
  const hoverBg = palette.interactive.hover;
  const activeBg = palette.interactive.active;
  const textFg = t.primary;
  const subTextFg = t.muted;
  const accent = t.accent || '#E87D4B';
  const accentHover = isLight ? '#C55F20' : '#F2A979';
  const border = b.subtle;
  
  // Message bubbles
  // In Cukup design philosophy:
  // Incoming message is subtle elevated surface
  // Outgoing message is warm tinted surface with accent tone or soft terracotta
  const inBubbleBg = isLight ? '#EFEBE6' : s.elevated;
  const inBubbleSelected = isLight ? '#E4DDD6' : s.surface;
  const inTextFg = t.primary;
  
  // Outgoing bubble: warm terracotta / persimmon dark blend
  const outBubbleBg = isLight ? '#FCEEE4' : (key === 'kopi' ? '#2A201C' : '#28231E');
  const outBubbleSelected = isLight ? '#F5DFC8' : '#3A2E28';
  const outTextFg = t.primary;

  return `// =============================================================================
// Cukup Theme for Telegram Desktop (${palette.name})
// Author: Hasan Suryaman
// Repository: https://github.com/mrbvrz/cukup-theme
// =============================================================================

// Window & Panels
windowBg: ${mainBg};
windowFg: ${textFg};
windowBgOver: ${hoverBg};
windowBgRipple: ${isLight ? '#00000015' : '#ffffff15'};
windowFgOver: ${textFg};
windowSubTextFg: ${subTextFg};
windowSubTextFgOver: ${t.secondary};
windowBoldFg: ${textFg};
windowBoldFgOver: ${textFg};
windowBgActive: ${accent};
windowFgActive: ${isLight ? '#FFFFFF' : '#161413'};
windowActiveTextFg: ${accent};
windowShadowFg: #00000030;
windowShadowFgFallback: ${border};
shadowFg: #00000020;
slideFadeOutBg: ${mainBg}cc;
slideFadeOutShadowFg: #00000000;
imageBg: ${mainBg};
imageBgTransparent: ${panelBg};

// Active & Outlined Buttons
activeButtonBg: ${accent};
activeButtonBgOver: ${accentHover};
activeButtonBgRipple: ${accent}33;
activeButtonFg: ${isLight ? '#FFFFFF' : '#161413'};
activeButtonFgOver: ${isLight ? '#FFFFFF' : '#161413'};
activeButtonSecondaryFg: ${isLight ? '#FFFFFFcc' : '#161413cc'};
activeButtonSecondaryFgOver: ${isLight ? '#FFFFFF' : '#161413'};
activeLineFg: ${accent};
activeLineFgError: ${stat.error};

lightButtonBg: ${elevatedBg};
lightButtonBgOver: ${hoverBg};
lightButtonBgRipple: ${activeBg};
lightButtonFg: ${accent};
lightButtonFgOver: ${accentHover};

attentionButtonFg: ${stat.error};
attentionButtonFgOver: ${stat.error};
attentionButtonBgOver: ${stat.error}22;
attentionButtonBgRipple: ${stat.error}33;

outlineButtonBg: ${mainBg};
outlineButtonBgOver: ${hoverBg};
outlineButtonOutlineFg: ${accent};
outlineButtonBgRipple: ${activeBg};

// Menus & Popups
menuBg: ${elevatedBg};
menuBgOver: ${hoverBg};
menuBgRipple: ${activeBg};
menuIconFg: ${subTextFg};
menuIconFgOver: ${textFg};
menuSubmenuArrowFg: ${subTextFg};
menuFgDisabled: ${t.disabled || subTextFg};
menuSeparatorFg: ${border};

// Scrollbars
scrollBarBg: ${palette.interactive.scrollbarThumb || '#ffffff20'};
scrollBarBgOver: ${palette.interactive.scrollbarThumbHover || '#ffffff35'};
scrollBg: #00000000;
scrollBgOver: #00000010;

smallCloseIconFg: ${subTextFg};
smallCloseIconFgOver: ${textFg};
radialFg: ${accent};
radialBg: #00000050;

placeholderFg: ${subTextFg};
placeholderFgActive: ${t.secondary};
inputBorderFg: ${border};
filterInputBorderFg: ${accent};
filterInputInactiveBg: ${panelBg};

checkboxFg: ${subTextFg};
sliderBgInactive: ${border};
sliderBgActive: ${accent};

tooltipBg: ${elevatedBg};
tooltipFg: ${textFg};
tooltipBorderFg: ${border};

// Window Titlebar
titleBg: ${panelBg};
titleShadow: #00000000;
titleButtonFg: ${subTextFg};
titleButtonBgOver: ${hoverBg};
titleButtonFgOver: ${textFg};
titleButtonCloseBgOver: ${stat.error};
titleButtonCloseFgOver: #FFFFFF;
titleFgActive: ${textFg};
titleFg: ${subTextFg};

// System & Tray Counters
trayCounterBg: ${accent};
trayCounterBgMute: ${subTextFg};
trayCounterFg: ${isLight ? '#FFFFFF' : '#161413'};
trayCounterBgMacInvert: ${accent};
trayCounterFgMacInvert: ${isLight ? '#FFFFFF' : '#161413'};
layerBg: #00000070;
cancelIconFg: ${subTextFg};
cancelIconFgOver: ${textFg};

// Dialogs & Modals
boxBg: ${elevatedBg};
boxTextFg: ${textFg};
boxTextFgGood: ${stat.created};
boxTextFgError: ${stat.error};
boxTitleFg: ${textFg};
boxSearchBg: ${mainBg};
boxSearchCancelIconFg: ${subTextFg};
boxSearchCancelIconFgOver: ${textFg};
boxTitleAdditionalFg: ${subTextFg};
boxTitleCloseFg: ${subTextFg};
boxTitleCloseFgOver: ${textFg};
membersAboutLimitFg: ${subTextFg};

// Contacts List
contactsBg: ${mainBg};
contactsBgOver: ${hoverBg};
contactsNameFg: ${textFg};
contactsStatusFg: ${subTextFg};
contactsStatusFgOver: ${t.secondary};
contactsStatusFgOnline: ${accent};

// Left Sidebar & Chat List
dialogsMenuIconFg: ${subTextFg};
dialogsMenuIconFgOver: ${textFg};
dialogsBg: ${panelBg};
dialogsNameFg: ${textFg};
dialogsChatIconFg: ${textFg};
dialogsDateFg: ${subTextFg};
dialogsTextFg: ${subTextFg};
dialogsTextFgService: ${accent};
dialogsDraftFg: ${stat.warning};
dialogsVerifiedIconBg: ${accent};
dialogsVerifiedIconFg: ${isLight ? '#FFFFFF' : '#161413'};
dialogsSendingIconFg: ${subTextFg};
dialogsSentIconFg: ${accent};
dialogsUnreadBg: ${accent};
dialogsUnreadBgMuted: ${subTextFg}88;
dialogsUnreadFg: ${isLight ? '#FFFFFF' : '#161413'};
dialogsBgOver: ${hoverBg};
dialogsNameFgOver: ${textFg};
dialogsChatIconFgOver: ${textFg};
dialogsDateFgOver: ${textFg};
dialogsTextFgOver: ${t.secondary};
dialogsTextFgServiceOver: ${accent};
dialogsDraftFgOver: ${stat.warning};
dialogsVerifiedIconBgOver: ${accent};
dialogsVerifiedIconFgOver: ${isLight ? '#FFFFFF' : '#161413'};
dialogsSendingIconFgOver: ${subTextFg};
dialogsSentIconFgOver: ${accent};
dialogsUnreadBgOver: ${accent};
dialogsUnreadBgMutedOver: ${subTextFg};
dialogsUnreadFgOver: ${isLight ? '#FFFFFF' : '#161413'};
dialogsBgActive: ${hoverBg};
dialogsNameFgActive: ${textFg};
dialogsChatIconFgActive: ${textFg};
dialogsDateFgActive: ${accent};
dialogsTextFgActive: ${t.secondary};
dialogsTextFgServiceActive: ${accent};
dialogsDraftFgActive: ${stat.warning};
dialogsVerifiedIconBgActive: ${accent};
dialogsVerifiedIconFgActive: ${isLight ? '#FFFFFF' : '#161413'};
dialogsSendingIconFgActive: ${subTextFg};
dialogsSentIconFgActive: ${accent};
dialogsUnreadBgActive: ${accent};
dialogsUnreadBgMutedActive: ${subTextFg};
dialogsUnreadFgActive: ${isLight ? '#FFFFFF' : '#161413'};
dialogsRippleBg: ${isLight ? '#00000010' : '#ffffff10'};
dialogsRippleBgActive: ${isLight ? '#00000015' : '#ffffff15'};

// Chat History View
historyTextInFg: ${inTextFg};
historyTextInFgSelected: ${inTextFg};
historyTextOutFg: ${outTextFg};
historyTextOutFgSelected: ${outTextFg};
historyCaptionInFg: ${inTextFg};
historyCaptionOutFg: ${outTextFg};
historyFileNameInFg: ${inTextFg};
historyFileNameOutFg: ${outTextFg};
historyOutIconFg: ${accent};
historyOutIconFgSelected: ${accent};
historyIconFgInverted: ${isLight ? '#FFFFFF' : '#161413'};
historySendingOutIconFg: ${subTextFg};
historySendingInIconFg: ${subTextFg};
historySendingInvertedIconFg: #ffffff80;

historySystemBg: ${panelBg}cc;
historySystemBgSelected: ${hoverBg}cc;
historySystemFg: ${textFg};
historyUnreadBarBg: ${elevatedBg};
historyUnreadBarBorder: ${border};
historyUnreadBarFg: ${accent};
historyForwardChooseBg: ${elevatedBg}ee;
historyForwardChooseFg: ${textFg};

// Peer Name Colors in Groups
historyPeer1NameFg: #DE6E75;
historyPeer1UserpicBg: #DE6E75;
historyPeer2NameFg: #89BA81;
historyPeer2UserpicBg: #89BA81;
historyPeer3NameFg: #DDA861;
historyPeer3UserpicBg: #DDA861;
historyPeer4NameFg: #6BAFAD;
historyPeer4UserpicBg: #6BAFAD;
historyPeer5NameFg: #B294C7;
historyPeer5UserpicBg: #B294C7;
historyPeer6NameFg: #E89058;
historyPeer6UserpicBg: #E89058;
historyPeer7NameFg: #5E9EA0;
historyPeer7UserpicBg: #5E9EA0;
historyPeer8NameFg: #E87D4B;
historyPeer8UserpicBg: #E87D4B;
historyPeerUserpicFg: #FFFFFF;

historyScrollBarBg: ${palette.interactive.scrollbarThumb || '#ffffff20'};
historyScrollBarBgOver: ${palette.interactive.scrollbarThumbHover || '#ffffff35'};
historyScrollBg: #00000000;
historyScrollBgOver: #00000010;

// Message Bubbles
msgInBg: ${inBubbleBg};
msgInBgSelected: ${inBubbleSelected};
msgOutBg: ${outBubbleBg};
msgOutBgSelected: ${outBubbleSelected};
msgSelectOverlay: ${accent}25;
msgStickerOverlay: ${accent}40;
msgInServiceFg: ${accent};
msgInServiceFgSelected: ${accent};
msgOutServiceFg: ${accent};
msgOutServiceFgSelected: ${accent};
msgInShadow: #00000018;
msgInShadowSelected: #00000025;
msgOutShadow: #00000018;
msgOutShadowSelected: #00000025;
msgInDateFg: ${subTextFg};
msgInDateFgSelected: ${subTextFg};
msgOutDateFg: ${subTextFg};
msgOutDateFgSelected: ${subTextFg};
msgServiceFg: ${textFg};
msgServiceBg: ${panelBg}b0;
msgServiceBgSelected: ${hoverBg}c0;

// Reply / Quote Bars
msgInReplyBarColor: ${accent};
msgInReplyBarSelColor: ${accent};
msgOutReplyBarColor: ${accent};
msgOutReplyBarSelColor: ${accent};
msgImgReplyBarColor: ${accent};

// Monospace / Code Blocks in Chat
msgInMonoFg: ${syn.string || '#B294C7'};
msgOutMonoFg: ${syn.string || '#B294C7'};
msgInMonoFgSelected: ${syn.string || '#B294C7'};
msgOutMonoFgSelected: ${syn.string || '#B294C7'};

msgDateImgFg: #FFFFFF;
msgDateImgBg: #00000060;
msgDateImgBgOver: #00000080;
msgDateImgBgSelected: ${accent}80;

// File Attachment Bubbles
msgFileThumbLinkInFg: ${accent};
msgFileThumbLinkInFgSelected: ${accent};
msgFileThumbLinkOutFg: ${accent};
msgFileThumbLinkOutFgSelected: ${accent};
msgFileInBg: ${accent};
msgFileInBgOver: ${accentHover};
msgFileInBgSelected: ${accentHover};
msgFileOutBg: ${accent};
msgFileOutBgOver: ${accentHover};
msgFileOutBgSelected: ${accentHover};
msgFile1Bg: #6BAFAD;
msgFile1BgDark: #559391;
msgFile1BgOver: #559391;
msgFile1BgSelected: #559391;
msgFile2Bg: #89BA81;
msgFile2BgDark: #6F9B68;
msgFile2BgOver: #6F9B68;
msgFile2BgSelected: #6F9B68;
msgFile3Bg: #DE6E75;
msgFile3BgDark: #B8535A;
msgFile3BgOver: #B8535A;
msgFile3BgSelected: #B8535A;
msgFile4Bg: #DDA861;
msgFile4BgDark: #B58444;
msgFile4BgOver: #B58444;
msgFile4BgSelected: #B58444;

historyFileInIconFg: ${inBubbleBg};
historyFileInIconFgSelected: ${inBubbleSelected};
historyFileInRadialFg: ${accent};
historyFileInRadialFgSelected: ${accent};
historyFileOutIconFg: ${outBubbleBg};
historyFileOutIconFgSelected: ${outBubbleSelected};
historyFileOutRadialFg: ${accent};
historyFileOutRadialFgSelected: ${accent};
historyFileThumbIconFg: ${inBubbleBg};
historyFileThumbIconFgSelected: ${inBubbleSelected};
historyFileThumbRadialFg: ${accent};
historyFileThumbRadialFgSelected: ${accent};

// Voice Note Waveforms
msgWaveformInActive: ${accent};
msgWaveformInActiveSelected: ${accent};
msgWaveformInInactive: ${subTextFg}60;
msgWaveformInInactiveSelected: ${subTextFg}80;
msgWaveformOutActive: ${accent};
msgWaveformOutActiveSelected: ${accent};
msgWaveformOutInactive: ${subTextFg}60;
msgWaveformOutInactiveSelected: ${subTextFg}80;

msgBotKbOverBgAdd: ${isLight ? '#00000010' : '#ffffff15'};
msgBotKbIconFg: ${accent};
msgBotKbRippleBg: ${isLight ? '#00000015' : '#ffffff20'};
mediaInFg: ${subTextFg};
mediaInFgSelected: ${subTextFg};
mediaOutFg: ${subTextFg};
mediaOutFgSelected: ${subTextFg};

youtubePlayIconBg: #DE6E75d0;
youtubePlayIconFg: #FFFFFF;
videoPlayIconBg: #00000080;
videoPlayIconFg: #FFFFFF;
toastBg: ${elevatedBg}ee;
toastFg: ${textFg};
reportSpamBg: ${elevatedBg};
reportSpamFg: ${textFg};

// Bottom Message Input & Compose Area
historyToDownShadow: #00000020;
historyComposeAreaBg: ${panelBg};
historyComposeAreaFg: ${textFg};
historyComposeAreaFgService: ${subTextFg};
historyComposeIconFg: ${subTextFg};
historyComposeIconFgOver: ${accent};
historySendIconFg: ${accent};
historySendIconFgOver: ${accentHover};
historyPinnedBg: ${panelBg};
historyReplyBg: ${panelBg};
historyReplyIconFg: ${accent};
historyReplyCancelFg: ${subTextFg};
historyReplyCancelFgOver: ${textFg};
historyComposeButtonBg: ${panelBg};
historyComposeButtonBgOver: ${hoverBg};
historyComposeButtonBgRipple: ${activeBg};

// Profile & Media Views
mainMenuBg: ${panelBg};
mainMenuCoverBg: ${accent};
mainMenuCoverFg: ${isLight ? '#FFFFFF' : '#161413'};
mediaPlayerBg: ${panelBg};
mediaPlayerActiveFg: ${accent};
mediaPlayerInactiveFg: ${border};
mediaPlayerDisabledFg: ${subTextFg};

mediaviewFileBg: ${mainBg};
mediaviewFileNameFg: ${textFg};
mediaviewFileSizeFg: ${subTextFg};
mediaviewFileRedCornerFg: #DE6E75;
mediaviewFileYellowCornerFg: #DDA861;
mediaviewFileGreenCornerFg: #89BA81;
mediaviewFileBlueCornerFg: #6BAFAD;
mediaviewFileExtFg: ${accent};
mediaviewMenuBg: ${elevatedBg};
mediaviewMenuBgOver: ${hoverBg};
mediaviewMenuBgRipple: ${activeBg};
mediaviewMenuFg: ${textFg};
mediaviewBg: #0f0e0df2;
mediaviewVideoBg: #000000;
mediaviewControlBg: #00000060;
mediaviewControlFg: #FFFFFF;
mediaviewCaptionBg: #00000090;
mediaviewCaptionFg: #FFFFFF;
mediaviewTextLinkFg: ${accent};
mediaviewSaveMsgBg: ${elevatedBg}ee;
mediaviewSaveMsgFg: ${textFg};
mediaviewPlaybackActive: ${accent};
mediaviewPlaybackInactive: #444444;
mediaviewPlaybackActiveOver: ${accentHover};
mediaviewPlaybackInactiveOver: #555555;
mediaviewPlaybackProgressFg: #FFFFFFcc;
mediaviewPlaybackIconFg: #FFFFFF;
mediaviewPlaybackIconFgOver: #FFFFFF;
mediaviewTransparentBg: #FFFFFF;
mediaviewTransparentFg: #CCCCCC;
notificationBg: ${elevatedBg};
`;
}

/**
 * Generates Telegram for macOS (.palette) content
 */
function generateTelegramMacosPalette(palette) {
  const isDark = palette.variant !== 'light' ? 1 : 0;
  const s = palette.surface;
  const b = palette.border;
  const t = palette.text;
  const stat = palette.status;
  const syn = palette.syntax;
  const accent = t.accent || '#E87D4B';

  const mainBg = s.canvas;
  const panelBg = s.panel || s.canvas;
  const elevatedBg = s.elevated || s.surface;
  const hoverBg = palette.interactive.hover;
  const textFg = t.primary;
  const grayText = t.muted;

  const inBubbleBg = isDark ? s.elevated : '#EFEBE6';
  const outBubbleBg = isDark ? (palette.name.includes('Kopi') ? '#2A201C' : '#28231E') : '#FCEEE4';

  return `// =============================================================================
// Cukup Theme for Telegram macOS (${palette.name})
// Author: Hasan Suryaman
// Repository: https://github.com/mrbvrz/cukup-theme
// =============================================================================

name = ${palette.name}
isDark = ${isDark}
tinted = 0
parent = ${isDark ? 'dark' : 'day'}
copyright = Cukup Theme (https://github.com/mrbvrz/cukup-theme)

basicAccent = ${accent}
background = ${mainBg}
text = ${textFg}
grayText = ${grayText}
link = ${accent}
accent = ${accent}
redUI = ${stat.error}
greenUI = ${stat.created}

blackTransparent = #000000:0.6
grayTransparent = ${elevatedBg}:0.5
grayUI = ${grayText}
darkGrayText = ${grayText}
accentSelect = ${hoverBg}
selectText = ${hoverBg}
border = ${b.subtle}
grayBackground = ${panelBg}
grayForeground = ${hoverBg}
grayIcon = ${grayText}
accentIcon = ${accent}
badgeMuted = ${grayText}
badge = ${accent}
indicatorColor = ${stat.created}
selectMessage = ${hoverBg}

monospacedPre = ${syn.string || '#B294C7'}
monospacedCode = ${accent}
monospacedPreBubble_incoming = ${syn.string || '#B294C7'}
monospacedPreBubble_outgoing = ${syn.string || '#B294C7'}
monospacedCodeBubble_incoming = ${accent}
monospacedCodeBubble_outgoing = ${accent}

selectTextBubble_incoming = ${accent}:0.3
selectTextBubble_outgoing = ${accent}:0.3
bubbleBackground_incoming = ${inBubbleBg}
bubbleBackground_outgoing = ${outBubbleBg}
bubbleBorder_incoming = ${inBubbleBg}
bubbleBorder_outgoing = ${outBubbleBg}
grayTextBubble_incoming = ${grayText}
grayTextBubble_outgoing = ${grayText}
grayIconBubble_incoming = ${grayText}
grayIconBubble_outgoing = ${grayText}
accentIconBubble_incoming = ${accent}
accentIconBubble_outgoing = ${accent}
linkBubble_incoming = ${accent}
linkBubble_outgoing = ${accent}
textBubble_incoming = ${textFg}
textBubble_outgoing = ${textFg}
selectMessageBubble = ${accent}:0.25

fileActivityBackground = ${accent}
fileActivityForeground = ${isDark ? '#161413' : '#FFFFFF'}
fileActivityBackgroundBubble_incoming = ${accent}
fileActivityBackgroundBubble_outgoing = ${accent}
fileActivityForegroundBubble_incoming = ${isDark ? '#161413' : '#FFFFFF'}
fileActivityForegroundBubble_outgoing = ${isDark ? '#161413' : '#FFFFFF'}

waveformBackground = ${grayText}
waveformForeground = ${accent}
waveformBackgroundBubble_incoming = ${grayText}
waveformBackgroundBubble_outgoing = ${grayText}
waveformForegroundBubble_incoming = ${accent}
waveformForegroundBubble_outgoing = ${accent}

webPreviewActivity = ${accent}
webPreviewActivityBubble_incoming = ${accent}
webPreviewActivityBubble_outgoing = ${accent}

redBubble_incoming = ${stat.error}
redBubble_outgoing = ${stat.error}
greenBubble_incoming = ${stat.created}
greenBubble_outgoing = ${stat.created}

chatReplyTitle = ${accent}
chatReplyTextEnabled = ${textFg}
chatReplyTextDisabled = ${grayText}
chatReplyTitleBubble_incoming = ${accent}
chatReplyTitleBubble_outgoing = ${accent}
chatReplyTextEnabledBubble_incoming = ${textFg}
chatReplyTextEnabledBubble_outgoing = ${textFg}
chatReplyTextDisabledBubble_incoming = ${grayText}
chatReplyTextDisabledBubble_outgoing = ${grayText}

groupPeerNameRed = #DE6E75
groupPeerNameOrange = #E89058
groupPeerNameViolet = #B294C7
groupPeerNameGreen = #89BA81
groupPeerNameCyan = #6BAFAD
groupPeerNameLightBlue = #5E9EA0
groupPeerNameBlue = #6BAFAD

peerAvatarRedTop = #EA8A90
peerAvatarRedBottom = #DE6E75
peerAvatarOrangeTop = #F2A979
peerAvatarOrangeBottom = #E89058
peerAvatarVioletTop = #C9B2DB
peerAvatarVioletBottom = #B294C7
peerAvatarGreenTop = #A2D19A
peerAvatarGreenBottom = #89BA81
peerAvatarCyanTop = #8ACBC9
peerAvatarCyanBottom = #6BAFAD
peerAvatarBlueTop = #7FBEC0
peerAvatarBlueBottom = #5E9EA0
peerAvatarPinkTop = #DE6E75
peerAvatarPinkBottom = #B84E55

bubbleBackgroundHighlight_incoming = ${hoverBg}
bubbleBackgroundHighlight_outgoing = ${hoverBg}
chatDateActive = ${elevatedBg}
chatDateText = ${textFg}

chatBackground = ${mainBg}
listBackground = ${panelBg}
listGrayText = ${grayText}
grayHighlight = ${hoverBg}
focusAnimationColor = ${accent}
vibrant = ${hoverBg}
premium = ${accent}
wallpaper = ${mainBg}
`;
}

module.exports = {
  createSolidPng,
  generateTdesktopColors,
  generateTelegramMacosPalette
};
