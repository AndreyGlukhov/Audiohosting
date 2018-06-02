from django import forms
from records.models import Record


class RecordFormLikeDisLike(forms.ModelForm):

    class Meta:
        model = Record
        fields = (
            'like',
            'dislike'
        )
