import { Asset, launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';

export class FileHelper {
    static async pickFile({ limit = 1}) {
        const res = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: limit
        });
        if (res.assets) {
            const photos: Asset[] = [];
            for(let i = 0; i < res.assets.length; i++) {
                const asset = res.assets[i];
                let width = asset.width!;
                let height = asset.height!;
                const response = await ImageResizer.createResizedImage(
                    asset.uri ?? '',
                    width,
                    height,
                    'JPEG',
                    100,
                    0,
                    undefined,
                    false,
                    {
                        mode: "contain"
                    },
                );
                photos.push({...asset, uri: response.uri});
            }
            return photos;
        }
        return false;
    };
};
