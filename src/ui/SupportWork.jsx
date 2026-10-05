import { useRef } from "react";

export function SupportWork() {
  const dialog = useRef(null);
  return <>
    <button className="support-trigger" aria-haspopup="dialog" aria-controls="support-work" onClick={() => dialog.current.showModal()}>Support my work</button>
    <dialog ref={dialog} id="support-work" className="support-work" aria-labelledby="support-title" onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }}>
      <div className="support-content">
        <button className="support-close" aria-label="Close support options" onClick={() => dialog.current.close()} autoFocus>×</button>
        <p className="eyebrow">SUPPORT</p>
        <h2 id="support-title">Support my work</h2>
        <p>Enjoying Neon Glider? Your support helps me maintain this game and build more independent projects. It is always optional.</p>
        <div className="support-options">
          <section><h3>GitHub Sponsors</h3><p>Support monthly or make a one-time contribution.</p><a href="https://github.com/sponsors/thangldw" target="_blank" rel="noopener noreferrer">Continue on GitHub ↗</a></section>
          <section><h3>Ko-fi</h3><p>Leave a one-time tip.</p><a href="https://ko-fi.com/F4N224DDUV" target="_blank" rel="noopener noreferrer">Support on Ko-fi ↗</a></section>
          <section className="support-bank"><h3>Bank transfer · Vietnam</h3><p>MB Bank · Luu Duc Thang</p><img src="https://thangldw.github.io/assets/support-vietqr-mb.jpg" width="845" height="1151" alt="VietQR for an MB Bank transfer to Luu Duc Thang" loading="lazy" /><p>Scan with a Vietnamese banking app.</p></section>
        </div>
      </div>
    </dialog>
  </>;
}
