<template>
  <div>
    <div class='share-container'><a href='#' @click.prevent='openDialog' class='open-share-dialog'>Share</a></div>
    <div v-if='isOpened' class='share-dialog' @click='hide'>
      <div class='share-window' ref='shareWindow'>
        <h2>Share link</h2>
        <a href='#' @click.prevent='hide' class='close-btn close-modal' title='close'>x</a>
        <div class='providers'>
          <a v-for='provider in providers' v-html='provider.svg' class='logo close-modal' :href='getLink(provider.name)' :style='{background: provider.color}'
            target='_blank' :title='provider.name'>
          </a>
        </div>
        <div class='url'>
          <input type='text' v-model='enteredUrl' ref='urlInput' @focus='selectAll'>
          <div class='shortener'>
            <div v-if='shortenState === "canShorten"'>
              <input type='checkbox' id='shortenURL' name='shorten' v-model='shouldShorten' @change='requestShorten'>
              <label for='shortenURL'>Short URL</label>
            </div>
            <div v-if='shortenState === "shortening"'>
              Shortening URL...
            </div>
            <div v-if='shortenState === "error"'>
              Couldn't shorten :(
            </div>
          </div>
          <div class='hint'>You can also copy the link from your browser's address bar.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shortener from '../lib/shortener';
import bus from '../lib/bus';
var providers = getProviders();

export default {
  name: 'Share',
  mounted() {
    bus.on('open-share-dialog', this.openDialog, this);
    this.lastCallTime = new Date();
  },
  beforeDestroy() {
    bus.off('open-share-dialog', this.openDialog, this);
  },
  data() {
    return { 
      providers,
      isOpened: false,
      shouldShorten: false,
      enteredUrl: getCurrentLink(false),
      shortenState: 'canShorten'
    }
  },
  methods: {
    requestShorten() {
      if (isShortened(this.enteredUrl)) {
        this.enteredUrl = getCurrentLink(false);
        return;
      }

      if (this.shouldShorten) {
        this.shortenState = 'shortening';
        shortener(this.enteredUrl).then((shortUrl) => {
          this.shortenState = 'canShorten';
          this.enteredUrl = shortUrl;
        }).catch(err => {
          this.shortenState = 'error'
        });
      }
    },
    getLink(providerName) {
      return getLink(providerName, encodeURIComponent(this.enteredUrl));
    },
    hide(e) {
      var callTime = new Date();
      if (callTime - this.lastCallTime < 300) {
        // On iPhone both label and input send this event. We don't want to 
        // execute it twice, since after first call we hide the input, and check
        // below assumes the call is not coming from the inside of a dialog.
        return;
      }
      this.lastCallTime = callTime;
      var {shareWindow} = this.$refs;
      if (!shareWindow) return;
      var partOfADialog = (shareWindow.contains(e.target)  && !e.target.classList.contains('close-modal'));
      if (partOfADialog || e.target == shareWindow) {
          return;
      }
      this.isOpened = false;
      this.shortenState = 'canShorten';
      this.shouldShorten = false;
    },
    openDialog() {
      this.isOpened = true;
      this.enteredUrl = getCurrentLink(false);
    },
    selectAll(e) {
      e.target.select();
    }
  }
}

function getLink(providerName, currentLink) {
  switch (providerName) {
    case 'Reddit': return `https://reddit.com/submit?url=${currentLink}`;
    case 'Twitter': return `https://twitter.com/intent/tweet?url=${currentLink}`;
    case 'Facebook': return `https://www.facebook.com/sharer/sharer.php?u=${currentLink}`;
    case 'email': return `mailto:?body=${currentLink}`;
  }
  return '';
}

function isShortened(link) {
  return link && link.indexOf('https://goo.gl') === 0;
}

function getCurrentLink(encode = true) {
  return encode ? encodeURIComponent(window.location.href) : window.location.href;
}

function getProviders() {
  return [{
    link: '',
    name: 'Reddit',
    color: '#FF4500',
    svg: '<svg aria-labelledby="simpleicons-reddit-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-reddit-icon">Reddit icon</title><path d="M2.204 14.049c-.06.276-.091.56-.091.847 0 3.443 4.402 6.249 9.814 6.249 5.41 0 9.812-2.804 9.812-6.249 0-.274-.029-.546-.082-.809l-.015-.032c-.021-.055-.029-.11-.029-.165-.302-1.175-1.117-2.241-2.296-3.103-.045-.016-.088-.039-.126-.07-.026-.02-.045-.042-.067-.064-1.792-1.234-4.356-2.008-7.196-2.008-2.815 0-5.354.759-7.146 1.971-.014.018-.029.033-.049.049-.039.033-.084.06-.13.075-1.206.862-2.042 1.937-2.354 3.123 0 .058-.014.114-.037.171l-.008.015zm9.773 5.441c-1.794 0-3.057-.389-3.863-1.197-.173-.174-.173-.457 0-.632.176-.165.46-.165.635 0 .63.629 1.685.943 3.228.943 1.542 0 2.591-.3 3.219-.929.165-.164.45-.164.629 0 .165.18.165.465 0 .645-.809.808-2.065 1.198-3.862 1.198l.014-.028zm-3.606-7.573c-.914 0-1.677.765-1.677 1.677 0 .91.763 1.65 1.677 1.65s1.651-.74 1.651-1.65c0-.912-.739-1.677-1.651-1.677zm7.233 0c-.914 0-1.678.765-1.678 1.677 0 .91.764 1.65 1.678 1.65s1.651-.74 1.651-1.65c0-.912-.739-1.677-1.651-1.677zm4.548-1.595c1.037.833 1.8 1.821 2.189 2.904.45-.336.719-.864.719-1.449 0-1.002-.815-1.816-1.818-1.816-.399 0-.778.129-1.09.363v-.002zM2.711 9.963c-1.003 0-1.817.816-1.817 1.818 0 .543.239 1.048.644 1.389.401-1.079 1.172-2.053 2.213-2.876-.302-.21-.663-.329-1.039-.329v-.002zm9.217 12.079c-5.906 0-10.709-3.205-10.709-7.142 0-.275.023-.544.068-.809C.494 13.598 0 12.729 0 11.777c0-1.496 1.227-2.713 2.725-2.713.674 0 1.303.246 1.797.682 1.856-1.191 4.357-1.941 7.112-1.992l1.812-5.524.404.095s.016 0 .016.002l4.223.993c.344-.798 1.138-1.36 2.065-1.36 1.229 0 2.231 1.004 2.231 2.234 0 1.232-1.003 2.234-2.231 2.234s-2.23-1.004-2.23-2.23l-3.851-.912-1.467 4.477c2.65.105 5.047.854 6.844 2.021.494-.464 1.144-.719 1.833-.719 1.498 0 2.718 1.213 2.718 2.711 0 .987-.54 1.886-1.378 2.365.029.255.059.494.059.749-.015 3.938-4.806 7.143-10.72 7.143l-.034.009zm8.179-19.187c-.74 0-1.34.599-1.34 1.338 0 .738.6 1.34 1.34 1.34.732 0 1.33-.6 1.33-1.334 0-.733-.598-1.332-1.347-1.332l.017-.012z"/></svg>'
  }, {
    link: '',
    name: 'Twitter',
    color: '#1DA1F2',
    svg: '<svg aria-labelledby="simpleicons-twitter-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-twitter-icon">Twitter icon</title><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg>',
  }, {
    link: '',
    name: 'Facebook',
    color: '#3B5998',
    svg: '<svg aria-labelledby="simpleicons-facebook-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-facebook-icon">Facebook icon</title><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"/></svg>'
  }, {
    link: '',
    name: 'email',
    color: '#888888',
    svg: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 14 14"><path d="M13 11.75v-6q-0.25 0.281-0.539 0.516-2.094 1.609-3.328 2.641-0.398 0.336-0.648 0.523t-0.676 0.379-0.801 0.191h-0.016q-0.375 0-0.801-0.191t-0.676-0.379-0.648-0.523q-1.234-1.031-3.328-2.641-0.289-0.234-0.539-0.516v6q0 0.102 0.074 0.176t0.176 0.074h11.5q0.102 0 0.176-0.074t0.074-0.176zM13 3.539v-0.191t-0.004-0.102-0.023-0.098-0.043-0.070-0.070-0.059-0.109-0.020h-11.5q-0.102 0-0.176 0.074t-0.074 0.176q0 1.312 1.148 2.219 1.508 1.187 3.133 2.477 0.047 0.039 0.273 0.23t0.359 0.293 0.348 0.246 0.395 0.215 0.336 0.070h0.016q0.156 0 0.336-0.070t0.395-0.215 0.348-0.246 0.359-0.293 0.273-0.23q1.625-1.289 3.133-2.477 0.422-0.336 0.785-0.902t0.363-1.027zM14 3.25v8.5q0 0.516-0.367 0.883t-0.883 0.367h-11.5q-0.516 0-0.883-0.367t-0.367-0.883v-8.5q0-0.516 0.367-0.883t0.883-0.367h11.5q0.516 0 0.883 0.367t0.367 0.883z"></path></svg>'
  }]
}

</script>
<style lang="stylus">
@import "./shared.styl";

.share-dialog {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  color: primary-text;

  .share-window {
    position: relative;
    background: window-background;
    padding: 14px;
    width: 360px;
    border: 1px solid primary-border;
    h2 {
      margin: 0;
      font-weight: normal;
      font-size: 16px;
    }
    .close-btn {
      color: primary-text;
      position: absolute;
      top: 0px;
      right: 0px;
      padding: 8px 14px;
    }

    div.providers {
      display: flex;
      padding: 14px 0;
      border-bottom: 1px solid secondary-border;
      justify-content: space-between;
    }
    .url {
      input[type='text'] {
        width: 100%;
        height: 32px;
        margin-top: 14px;

        // TODO: This is copy-paste from settings. Unify?
        background: transparent;
        color: primary-text;
        border: 1px solid secondary-border;
        padding: 7px;
        font-size: 16px;
        width: 100%;
        &:focus {
          outline: none;
          border: 1px dashed;
          background: #13294f;
        }
      }
      .shortener {
        margin-top: 8px;
        margin-bottom: 8px;
      }
      .hint {
        margin-top: 14px;
        font-size: 12px;
        color: secondary-text;
      }
    }
  }
}

.share-container {
  position: absolute;
  right: 0px;
  top: 0px;

  a.open-share-dialog {
    padding: 8px;
    color: white;
    display: block;
  }
}
.shortener label {
  user-select: none;
}
.logo {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: white;
    width: 24px;
    height: 24px;
  }
}

@media (max-width: small-screen) {
  .share-container {
    display: none;
  }
  .share-dialog {
    .share-window {
      width: 90%;
    }
  }
}
</style>

