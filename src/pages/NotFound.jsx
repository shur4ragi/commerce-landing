import { Link } from 'react-router';
import { jsonRoute } from '../utils/routes.js';
import { Button, Container } from '../components/ui';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <Container>
        <p>404</p>
        <h1>Essa página não faz parte do mapa.</h1>
        <Button href={jsonRoute.Home.path}>Voltar ao início</Button>
        <p className={styles.hint}>
          Ou use o <Link to={jsonRoute.Home.path}>link interno</Link> se preferir o React Router.
        </p>
      </Container>
    </main>
  );
}
