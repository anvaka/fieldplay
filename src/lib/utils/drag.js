/**
 * This is a simple dragging listener. It supports touch devices, and works
 * even when iframes are present on the page
 */
const preventTextSelection = createTextSelectionInterceptor();

/**
 * @param {DOMElement} owner that triggers dragging behavior
 * @param {Function(dx, dy)} onDrag called when user drags an element. It receives
 * related offsets dx, dy - by how far the element was moved compared to last time.
 */
export default function createDrag(owner, onDrag) {
  let overlay;
  let mouseX;
  let mouseY;
  let touchInProgress = false;

  if (owner) listenForEvents();

  return {
    dispose
  };

  function dispose() {
    if (!owner) return;

    releaseDocumentMouse();
    releaseTouches();

    owner.removeEventListener('mousedown', onMouseDown);
    owner.removeEventListener('touchstart', onTouch);
  }

  function listenForEvents() {
    owner.addEventListener('mousedown', onMouseDown);
    owner.addEventListener('touchstart', onTouch);
  }

  function injectWindowOverlay() {
    // so that mouse events are exclusively sent to us (even if we hover over iframes)
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.classList.add('drag-overlay');
      overlay.style.left = '0';
      overlay.style.top = '0';
      overlay.style.right = '0';
      overlay.style.bottom = '0';
      overlay.style.position = 'fixed';
      overlay.style.position = 'fixed';
      overlay.style.zIndex = '42'; // not sure if this will help us win z-index war.
    }
    document.body.appendChild(overlay);
  }

  function removeOverlay() {
    if (overlay) {
      document.body.removeChild(overlay);
    }
  }

  function onMouseDown(e) {
    if (e.target.classList.contains('no-drag')) return;
    if (touchInProgress) {
      // modern browsers will fire mousedown for touch events too
      // we do not want this: touch is handled separately.
      e.stopPropagation();
      return false;
    }
    injectWindowOverlay();

    // for IE, left click == 1
    // for Firefox, left click == 0
    const isLeftButton = ((e.button === 1 && window.event !== null) || e.button === 0);
    if (!isLeftButton) return;

    mouseX = e.clientX;
    mouseY = e.clientY;

    // We need to listen on document itself, since mouse can go outside of the
    // window, and we will loose it
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // preventTextSelection.capture(e.target || e.srcElement);

    return false;
  }

  function onMouseMove(e) {
    // no need to worry about mouse events when touch is happening
    if (touchInProgress) return;

    triggerPanStart();

    const dx = e.clientX - mouseX;
    const dy = e.clientY - mouseY;

    mouseX = e.clientX;
    mouseY = e.clientY;

    onDrag(dx, dy);
  }

  function onMouseUp() {
    preventTextSelection.release();
    triggerPanEnd();
    releaseDocumentMouse();
  }

  function releaseDocumentMouse() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    removeOverlay();
  }

  function onTouch(e) {
    if (e.touches.length === 1) {
      return handleSignleFingerTouch(e, e.touches[0]);
    }
  }

  function handleSignleFingerTouch(e) {
    if (e.target.classList.contains('no-drag')) return;

    e.stopPropagation();
    e.preventDefault();

    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;

    startTouchListenerIfNeeded();
  }

  function startTouchListenerIfNeeded() {
    if (!touchInProgress) {
      touchInProgress = true;
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('touchcancel', handleTouchEnd);
    }
  }

  function handleTouchEnd(e) {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    } else {
      touchInProgress = false;
      triggerPanEnd();
      releaseTouches();
    }
  }

  function releaseTouches() {
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    document.removeEventListener('touchcancel', handleTouchEnd);
  }

  function handleTouchMove(e) {
    if (e.touches.length !== 1) return;
    e.stopPropagation();
    const touch = e.touches[0];

    const dx = touch.clientX - mouseX;
    const dy = touch.clientY - mouseY;

    if (dx !== 0 && dy !== 0) {
      triggerPanStart();
    }
    mouseX = touch.clientX;
    mouseY = touch.clientY;
    onDrag(dx, dy);
  }

  function triggerPanStart() {
  }

  function triggerPanEnd() {
  }
}

function createTextSelectionInterceptor() {
  let dragObject;
  let prevSelectStart;
  let prevDragStart;

  return {
    capture,
    release
  };

  function capture(domObject) {
    prevSelectStart = window.document.onselectstart;
    prevDragStart = window.document.ondragstart;

    window.document.onselectstart = disabled;

    dragObject = domObject;
    dragObject.ondragstart = disabled;
  }

  function release() {
    window.document.onselectstart = prevSelectStart;
    if (dragObject) dragObject.ondragstart = prevDragStart;
  }
}

function disabled(e) {
  e.stopPropagation();
  return false;
}