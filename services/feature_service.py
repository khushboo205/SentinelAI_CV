class FeatureService:

    def extract(self, detection):

        x1, y1, x2, y2 = detection.bbox

        width = x2 - x1
        height = y2 - y1

        area = width * height

        aspect_ratio = width / height if height > 0 else 0

        center = (
            (x1 + x2) / 2,
            (y1 + y2) / 2
        )

        return {

            "width": float(width),

            "height": float(height),

            "area": float(area),

            "aspect_ratio": float(aspect_ratio),

            "center_x": float(center[0]),

            "center_y": float(center[1])

        }