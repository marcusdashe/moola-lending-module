import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReportIssueDto } from './dto/report-issue.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }
    
    async joinGroup(userId: number, joinGroupDto: JoinGroupDto) {
        const { groupId } = joinGroupDto;

        const group = await this.prisma.group.findUnique({
            where: { id; groupId }
        });

        if (!group) {
            throw new NotFoundException(`Group with ID ${groupId} not found`);
        }

        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                groups: {
                    connect: { id: groupId },
                }
            }
        });
        return user;
    }
        async ReportIssueDto(userId: Number, reportIssueDto: ReportIssueDto){
            const { issuedescription } = reportIssueDto

            const user = await this.prisma.user.update({
                where: { id: userId },
                data: {
                    issues: {
                        create: {
                            description: issuedescription
                        }
                    }
                }
            });
            return user;
        }
    }

