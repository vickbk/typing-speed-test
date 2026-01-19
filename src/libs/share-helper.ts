import html2canvas from "html2canvas";

export async function shareDataHelper(data: ShareData) {
  if (!navigator.canShare || !navigator.canShare({ files: [] })) {
    console.error(
      "Web share API or file sharing not supported by this browser",
    );
    return;
  }
  try {
    if (navigator.canShare(data)) {
      await navigator.share(data);
      return true;
    }
    throw new Error("This data cannot be shared");
  } catch (e) {
    console.log(e);
    return;
  }
}

export async function shareResults() {
  const canvas = await html2canvas(document.body);
  canvas.toBlob(
    async (blob) => {
      const files = [
        new File([blob!], "typing-speed-results.png", {
          type: blob?.type,
        }),
      ];
      await shareDataHelper({
        files,
        title: "Typing Speed Score",
        text: "Checkout my latest typing speed score! Ha Ha!!!",
        url: "https://vickbk.github.io/typing-speed-test/",
      });
    },
    "image/png",
    1.0,
  );
}
