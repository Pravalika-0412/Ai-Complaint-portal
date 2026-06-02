import pytest

from ai_classifier import _keyword_classify, classify_complaint


def test_keyword_classifier_matches_known_category() -> None:
    assert _keyword_classify("There are multiple potholes on the main road") == "Road Damage"


def test_classifier_uses_keyword_fallback_when_model_unavailable(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr("ai_classifier._load_zero_shot_pipeline", lambda: None)

    assert classify_complaint("The street light has been broken for three days") == "Street Lights"
