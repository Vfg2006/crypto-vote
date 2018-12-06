import { Injectable } from '@angular/core';

@Injectable()
export class ConstantesService {

  public static serverUrl: string = 'http://localhost:8080/api/'; 

  public static BRANCO = 'BRANCO'
  public static NULO = 'NULO'
  
  public static ENDERECO_NULO = "0x1cd781e915B387488864851F99F104b230768a60"
  public static ENDERECO_BRANCO = "0x5113E6bc76EfEb8325149f337b5084b64C11004E"

}
