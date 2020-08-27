import { PokeService } from "./pokemon.service";
import { AuthController } from "../../middleware/authController";
import passport from "passport";
import { Router } from "express";

export class PokemonController {
  public router: Router;
  private pokeService: PokeService =  new PokeService();
  public authController: AuthController = new AuthController();
  
  constructor() {
    this.router = Router()
    this.routes();
  }

  public routes() {
    this.router.get("/", this.pokeService.welcomeMessage);
    this.router.get("/pokemons",this.authController.authenticateJWT,this.pokeService.getAllPokemon);
    this.router.post("/pokemons",this.authController.authenticateJWT,this.pokeService.addNewPokemon);
    this.router.delete("/pokemons/:id", this.pokeService.deletePokemon);
    this.router.put("/pokemons/:id", this.pokeService.updatePokemon);
  }
}
