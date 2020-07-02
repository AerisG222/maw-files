import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FileUploader } from 'ng2-file-upload';

import { FileInfo } from '../../models/file-info';

export const remoteFileAdapter: EntityAdapter<FileInfo> = createEntityAdapter<FileInfo>({
    selectId: (a: FileInfo) => a.location.relativePath,
    sortComparer: (a: FileInfo, b: FileInfo): number => a > b ? -1 : 1
});

export interface State extends EntityState<FileInfo> {
    error: string | null;
    isLoading: boolean;
    uploader: FileUploader | null;
}

export const initialState: State = remoteFileAdapter.getInitialState({
    isLoading: false,
    error: null,
    uploader: null
});
