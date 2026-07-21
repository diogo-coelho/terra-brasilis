/**
 * Classe enum que representa os estados da neblina de guerra (Fog of War) em um cenário isométrico.
 *
 * @enum {number}
 *
 * @description
 * Esta enumeração define os diferentes estados que cada célula do mapa pode ter em relação à visibilidade:
 * - HIDDEN: A célula está completamente oculta e não é visível para o jogador.
 * - EXPLORED: A célula foi explorada anteriormente, mas atualmente não está visível.
 * - VISIBLE: A célula está atualmente visível para o jogador.
 *
 */
export enum FogState {
  HIDDEN = 0, // preto
  EXPLORED = 1, // cinza
  VISIBLE = 2, // transparente
}
