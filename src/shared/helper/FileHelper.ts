import { Asset, launchImageLibrary } from "react-native-image-picker";
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { IFile } from "../../types/file";

interface IPickFileProps {
    limit: number;
}

export class FileHelper {
    static async pickFile({limit = 1}: IPickFileProps) {
        const res = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: limit
        });

        if (res.assets) {
            const photos: Asset[] = [];
            for(let i = 0; i < res.assets.length; i++) {
                const asset = res.assets[i];
                let width: number = Math.min(asset.width!, 800);
                let height: number = width / 1.5;
                const response: Partial<IFile> = await ImageResizer.createResizedImage(asset.uri ?? '', width, height, 'JPEG', 100, 0, undefined, false, { mode: 'cover' });
                photos.push({ ...asset, uri: response.uri });
            }
            return photos;
        }
        return false;
    }
};