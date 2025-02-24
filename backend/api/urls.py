from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    
    # find a specific note
    path("notes/view/<int:id>/", views.NoteView.as_view(), name="view-note"),
    # add an edit path
    # path("notes/edit/<int:pk>/", views.NoteEdit.as_view(), name="edit-note")
]