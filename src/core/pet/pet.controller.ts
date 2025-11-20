import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PetService } from './pet.service';
import { successResponse } from 'src/utils/response.utils';
import { CreatePetDto, UpdatePetDto, GetPetsListDto } from './dto';

@ApiTags('pet')
@Controller({ path: 'pet', version: '1' })
export class PetControllerV1 {
  constructor(private readonly petService: PetService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new pet',
    description:
      'Creates a new pet for a specific owner. The owner must exist in the system.',
  })
  @ApiBody({ type: CreatePetDto })
  @ApiResponse({
    status: 201,
    description: 'Pet created successfully',
    schema: {
      example: {
        success: true,
        message: 'Pet created successfully',
        data: {
          id: 1,
          petName: 'Fluffy',
          rarity: 'legendary',
          ownerId: 1,
          owner: {
            id: 1,
            username: 'john_doe',
          },
        },
      },
    },
  })
  async createPet(@Body() createPetDto: CreatePetDto) {
    try {
      const pet = await this.petService.createPet(createPetDto);
      return successResponse(pet, 'Pet created successfully');
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Failed to create pet',
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get paginated list of pets',
    description:
      'Retrieves a paginated list of pets with optional filtering by owner, rarity, and search functionality.',
  })
  @ApiResponse({
    status: 200,
    description: 'Pets retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Pets retrieved successfully',
        data: {
          pets: [
            {
              id: 1,
              petName: 'Fluffy',
              rarity: 'legendary',
              ownerId: 1,
              owner: {
                id: 1,
                username: 'john_doe',
              },
            },
          ],
          total: 25,
          page: 1,
          limit: 10,
          totalPages: 3,
        },
      },
    },
  })
  async getPetsList(@Query() query: GetPetsListDto) {
    const result = await this.petService.getPetsList(query);
    return successResponse(result, 'Pets retrieved successfully');
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get pet by ID',
    description:
      'Retrieves a specific pet by its ID including owner information.',
  })
  @ApiResponse({
    status: 200,
    description: 'Pet retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Pet retrieved successfully',
        data: {
          id: 1,
          petName: 'Fluffy',
          rarity: 'legendary',
          ownerId: 1,
          owner: {
            id: 1,
            username: 'john_doe',
          },
        },
      },
    },
  })
  async getPetById(@Param('id', ParseIntPipe) id: number) {
    try {
      const pet = await this.petService.getPetById(id);
      return successResponse(pet, 'Pet retrieved successfully');
    } catch (error) {
      throw new NotFoundException(
        error instanceof Error ? error.message : 'Pet not found',
      );
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update pet by ID',
    description:
      'Updates an existing pet. Pet name and rarity can be modified.',
  })
  @ApiBody({ type: UpdatePetDto })
  @ApiResponse({
    status: 200,
    description: 'Pet updated successfully',
    schema: {
      example: {
        success: true,
        message: 'Pet updated successfully',
        data: {
          id: 1,
          petName: 'Fluffy Updated',
          rarity: 'mythical',
          ownerId: 1,
          owner: {
            id: 1,
            username: 'john_doe',
          },
        },
      },
    },
  })
  async updatePet(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    try {
      const pet = await this.petService.updatePet(id, updatePetDto);
      return successResponse(pet, 'Pet updated successfully');
    } catch (error) {
      throw new NotFoundException(
        error instanceof Error ? error.message : 'Pet not found',
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete pet by ID',
    description:
      'Permanently deletes a pet from the system. This action cannot be undone.',
  })
  @ApiResponse({
    status: 200,
    description: 'Pet deleted successfully',
    schema: {
      example: {
        success: true,
        message: 'Pet deleted successfully',
        data: {
          id: 1,
          petName: 'Fluffy',
          rarity: 'legendary',
          ownerId: 1,
          owner: {
            id: 1,
            username: 'john_doe',
          },
        },
      },
    },
  })
  async deletePet(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedPet = await this.petService.deletePet(id);
      return successResponse(deletedPet, 'Pet deleted successfully');
    } catch (error) {
      throw new NotFoundException(
        error instanceof Error ? error.message : 'Pet not found',
      );
    }
  }
}
