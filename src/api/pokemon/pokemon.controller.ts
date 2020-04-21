import { PokeService } from "./pokemon.service";

export class PokemonController {
  private pokeService: PokeService;

  constructor(private app: any) {
    this.pokeService = new PokeService();
    this.routes();
  }

  public routes() {
    this.app.route("/api/v1/mongo/").get(this.pokeService.welcomeMessage);

    this.app.route("/api/v1/mongo/pokemons").get(this.pokeService.getAllPokemon);

    this.app.route("/api/v1/mongo/pokemons").post(this.pokeService.addNewPokemon);

    this.app
      .route("/api/v1/mongo/pokemon/:id")
      .delete(this.pokeService.deletePokemon)
      .put(this.pokeService.updatePokemon);
  }
}
