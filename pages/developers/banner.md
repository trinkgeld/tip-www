---
title: Integrate the tip banner into your shop
description: Details on how to make the tip banner show up in the shopping cart.
summary: Tip Me works lets users shopping online give a tip. This guide explains shop owners how to integrate the tip banner into their shopping cart.
keywords:
  - banner
  - script
  - integration
  - javascript
  - marker
author: Jannis
---

## Integrate the tip banner into your shop

The tip banner asks users to give a tip. It looks like this:

![the tip banner when giving a tip](banner.png)

### 1. Embed the *Tip Me* script

Paste following code as the last child of the `body` element (right before `</body>`).

```html
<script src="https://trinkgeld.github.io/tip-ui/tip-ui.js"></script>
```

### 2. Insert a marker for the tip banner

Paste the following code where you want the banner to be shown:

```html
<div id="tip-me-banner" style="display: none;"></div>
```

### 3. Insert a marker for the amount

*coming soon*

### 4. Done

That's it! The banner should show up now. If not, [contact us](/contact/).
