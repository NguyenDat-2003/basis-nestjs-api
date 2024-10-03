import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { BookService } from './book.service'
import { Book } from './schemas/book.schema'
import { BookDTO } from './dto/book.dto'

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.findAll()
  }

  @Post()
  async createNewBook(
    @Body()
    book: BookDTO
  ): Promise<Book> {
    return await this.bookService.create(book)
  }

  @Get(':id')
  async getBookById(
    @Param('id')
    id: string
  ): Promise<Book> {
    return await this.bookService.findById(id)
  }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    book: BookDTO
  ): Promise<Book> {
    return await this.bookService.findByIdAndUpdate(id, book)
  }

  @Delete(':id')
  async deleteBook(
    @Param('id')
    id: string
  ): Promise<string> {
    return await this.bookService.findByIdAndDelete(id)
  }
}
