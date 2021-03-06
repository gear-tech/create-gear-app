import './NoExtension.scss';

const NoExtension = () => (
  <p>
    Polkadot extension was not found or disabled. Please{' '}
    <a
      href="https://polkadot.js.org/extension/"
      target="_blank"
      rel="noreferrer"
    >
      install it
    </a>
  </p>
);

export { NoExtension };
