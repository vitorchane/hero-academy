import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function ApiCreate() {
  return applyDecorators(
    ApiOperation({ summary: 'Criar um novo herói' }),
    ApiResponse({ status: 201, description: 'Herói criado com sucesso' }),
  );
}

export function ApiFindAll() {
  return applyDecorators(
    ApiOperation({ summary: 'Listar todos os heróis (paginado)' }),
    ApiQuery({ name: 'page', required: false, type: Number, description: 'Número da página (padrão: 1)' }),
    ApiQuery({ name: 'limit', required: false, type: Number, description: 'Registros por página (padrão: 10)' }),
    ApiQuery({ name: 'search', required: false, type: String, description: 'Busca por nome ou nickname' }),
    ApiResponse({ status: 200, description: 'Lista paginada de heróis retornada' }),
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
