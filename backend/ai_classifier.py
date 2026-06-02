import logging
from functools import lru_cache
from typing import Any

logger = logging.getLogger(__name__)

CATEGORIES = [
    "Road Damage",
    "Water Supply",
    "Electricity",
    "Garbage",
    "Street Lights",
    "Others",
]

KEYWORDS = {
    "Road Damage": [
        "road",
        "pothole",
        "potholes",
        "damaged road",
        "broken road",
        "traffic",
        "footpath",
    ],
    "Water Supply": [
        "water",
        "pipeline",
        "leakage",
        "tap",
        "drainage",
        "sewage",
        "supply",
    ],
    "Electricity": [
        "electricity",
        "power",
        "voltage",
        "transformer",
        "current",
        "wire",
        "outage",
    ],
    "Garbage": [
        "garbage",
        "waste",
        "trash",
        "dump",
        "dirty",
        "cleaning",
        "sanitation",
    ],
    "Street Lights": [
        "street light",
        "streetlight",
        "lamp",
        "light pole",
        "lighting",
        "dark street",
    ],
}


@lru_cache(maxsize=1)
def _load_zero_shot_pipeline() -> Any | None:
    try:
        from transformers import pipeline

        return pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
    except Exception:
        logger.debug("Zero-shot classifier unavailable; using keyword fallback.", exc_info=True)
        return None


def _keyword_classify(text: str) -> str:
    lowered = text.lower()
    scores = {
        category: sum(1 for keyword in keywords if keyword in lowered)
        for category, keywords in KEYWORDS.items()
    }
    best_category = max(scores, key=lambda category: scores[category])
    return best_category if scores[best_category] > 0 else "Others"


def classify_complaint(description: str) -> str:
    """Classify civic complaints with Hugging Face when available, then fallback safely."""
    classifier = _load_zero_shot_pipeline()
    if classifier:
        try:
            result = classifier(
                description,
                CATEGORIES,
                hypothesis_template="This citizen complaint is about {}.",
            )
            label = result["labels"][0]
            score = result["scores"][0]
            return label if score >= 0.35 else _keyword_classify(description)
        except Exception:
            logger.debug("Zero-shot classification failed; using keyword fallback.", exc_info=True)

    return _keyword_classify(description)
