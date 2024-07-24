export const timeCalculate = (timestamps) => {
    const now = new Date();
    const upload = new Date(timestamps);
    const diff = now - upload;
    const second = Math.floor(diff / 1000);
    const minute = Math.floor(second / 60);
    const hour = Math.floor(minute / 60);
    const day = Math.floor(hour / 24);

    if (day > 0) {
      const msg = `${day} days ago`;
      return msg;
    }
    if (day < 1 && hour > 0) {
      const msg = `${hour} hours ago`;
      return msg;
    }
    if (day < 1 && hour < 1 && minute > 0) {
      const msg = `${minute} minutes ago`;
      return msg;
    }
    if (day < 1 && hour < 1 && minute < 1 && second > 5) {
      const msg = `${second} seconds ago`;
      return msg;
    }
    if (day < 1 && hour < 1 && minute < 1 && second < 5) {
      const msg = `just now`;
      return msg;
    }
  };
