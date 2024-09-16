import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AddonService } from '../../../application/services/addon.service';
import { CreateAddonDto } from '../dtos/addon/create-addon.dto';
import { UpdateAddonDto } from '../dtos/addon/update-addon.dto';
import { ResponseAddonDto } from '../dtos/addon/response-addon.dto';
import { handleExceptions } from 'src/common/helpers/handleExceptions';

@Controller('addons')
export class AddonController {
  constructor(private readonly addonService: AddonService) {}

  @Post()
  async create(@Body() createAddonDto: CreateAddonDto) {
    try {
      const addon = await this.addonService.create(createAddonDto);
      return new ResponseAddonDto(addon);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Get()
  async getAll() {
    try {
      const addons = await this.addonService.getAll();
      return addons.map(addon => new ResponseAddonDto(addon));
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const addon = await this.addonService.getById(id);
      return new ResponseAddonDto(addon);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Put(':id')
  async updateAddon(@Param('id') id: string, @Body() updateAddonDto: UpdateAddonDto) {
    try {
      const updatedAddon = await this.addonService.update(id, updateAddonDto);
      return new ResponseAddonDto(updatedAddon);
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.addonService.softDelete(id);
      return { message: 'Addon deleted successfully' };
    } catch (error: unknown) {
      handleExceptions(error);
    }
  }
}
