addEventListener("message", (event: MessageEvent<number>) => {
  postMessage("This is an interesting message");
  console.log(event);
});
