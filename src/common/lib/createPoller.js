export default function createPoller(task, { interval }) {
  let timeout;
  let isStarted = false;

  function poll() {
    clearTimeout(timeout);

    if (!isStarted) { return; }

    timeout = setTimeout(() => task().then(poll, poll), interval);
  }

  function start() {
    isStarted = true;

    clearTimeout(timeout);
    task().then(poll, poll);
  }

  function stop() {
    isStarted = false;

    clearTimeout(timeout);
  }

  start();

  return { start, stop };
}
