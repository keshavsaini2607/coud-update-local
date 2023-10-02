import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('save')
  @UseInterceptors(FileInterceptor('file'))
  async saveFile(
    @Body() formData: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.fileService.saveFile(formData, file);
  }

  @Post('from-bucket')
  async getFilesFromBucket(@Body() { bucketId }) {
    return await this.fileService.getFilesFromBucket(bucketId);
  }

  @Delete('delete')
  async deleteFile(@Body() { fileId }) {
    return await this.fileService.deleteFile(fileId);
  }

  @Post('update')
  async updateFile(@Body() { data, fileId }) {
    return await this.fileService.updateFile(data, fileId);
  }
}
