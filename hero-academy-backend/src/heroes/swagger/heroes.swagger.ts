import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ApiCreate() {
  return applyDecorators(
    ApiOperation({ summary: 'Criar um novo herói' }),
    ApiResponse({ status: 201, description: 'Herói criado com sucesso' }),
  );
}

export function ApiFindAll() {
  return applyDecorators(
    ApiOperation({ summary: 'Listar todos os heróis' }),
    ApiResponse({ status: 200, description: 'Lista de heróis retornada' }),
  );
}

export function ApiFindById() {
  return applyDecorators(
    ApiOperation({ summary: 'Buscar herói por ID' }),
    ApiParam({ name: 'id', description: 'UUID do herói' }),
    ApiResponse({ status: 200, description: 'Herói encontrado' }),
    ApiResponse({ status: 404, description: 'Herói não encontrado' }),
  );
}

export function ApiUpdate() {
  return applyDecorators(
    ApiOperation({ summary: 'Atualizar herói parcialmente' }),
    ApiParam({ name: 'id', description: 'UUID do herói' }),
    ApiResponse({ status: 200, description: 'Herói atualizado com sucesso' }),
    ApiResponse({ status: 404, description: 'Herói não encontrado' }),
  );
}

export function ApiDelete() {
  return applyDecorators(
    ApiOperation({ summary: 'Deletar herói' }),
    ApiParam({ name: 'id', description: 'UUID do herói' }),
    ApiResponse({ status: 204, description: 'Herói deletado com sucesso' }),
    ApiResponse({ status: 404, description: 'Herói não encontrado' }),
  );
}
