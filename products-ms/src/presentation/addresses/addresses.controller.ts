import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('addresses')
export class AddressesController {

  constructor(private readonly addressesService: AddressesService) {}

  @MessagePattern({cmd: 'create_address'})
  create(@Payload() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @MessagePattern({cmd: 'find_address'})
  findOne(@Payload('code', new ParseUUIDPipe()) code: string) {
    return this.addressesService.findOne(code);
  }

  @MessagePattern({cmd: 'update_address'})
  update(@Payload() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(updateAddressDto.code, updateAddressDto);
  }

  @MessagePattern({cmd: 'delete_address'})
  remove(@Payload('code', new ParseUUIDPipe()) code: string) {
    return this.addressesService.remove(code);
  }

}
