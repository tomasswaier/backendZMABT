{
  description = "A very basic flake";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
          };
        };

      in
      {
        devShell = pkgs.mkShell {
          buildInputs = [
						pkgs.ngrok
						pkgs.nodejs
						pkgs.insomnia
          ];
        };
				#ngrok http 8080
				# to allow ngrok export NIXPKGS_ALLOW_UNFREE=1

      }
    );
}



