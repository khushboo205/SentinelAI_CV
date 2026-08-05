from core.pipeline_factory import create_pipeline


class PipelineService:

    def process_video(self, video_path):

        pipeline, agents = create_pipeline(video_path)

        pipeline.initialize()

        try:

            packet = pipeline.run()

            tracks = []

            for track in packet.tracks:

                d = track.detection

                tracks.append({

                    "track_id": d.track_id,

                    "class": d.class_name,

                    "risk": d.risk_score,

                    "alert": d.is_suspicious,

                    "face": d.face_detected,

                    "ocr": d.ocr_text,

                    "features": d.features

                })

            return {

                "status": "success",

                "tracks": tracks

            }

        finally:

            for agent in reversed(agents):

                agent.shutdown()