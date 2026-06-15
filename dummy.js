const d = new Date();

  const pad = (n) => String(n).padStart(2, "0");

  tt=
    d.getFullYear().toString() + "-" +
    pad(d.getMonth() + 1).toString() + "-" +
    pad(d.getDate()).toString() + "-" +
    pad(d.getHours()).toString() + "-" +
    pad(d.getMinutes()).toString() + "-" +
    pad(d.getSeconds())
;

  console.log(tt)
