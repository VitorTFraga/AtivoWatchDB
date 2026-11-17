import { app } from './app.js';
import { startSimulator } from './simulator.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
  console.log('Simulador de leituras ativado (1 leitura/segundo)');
  startSimulator();
});